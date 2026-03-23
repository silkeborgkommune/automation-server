from typing import List, Optional

from sqlalchemy import update
from sqlalchemy.sql import func
from sqlalchemy.types import String
from sqlmodel import Session, cast, select, or_

from app.database.models import Incident, Process
import app.enums as enums

from .database_repository import DatabaseRepository, AbstractRepository


class AbstractIncidentRepository(AbstractRepository[Incident]):
    def get_by_session_id(self, session_id: int) -> Optional[Incident]:
        raise NotImplementedError

    def get_open_incidents(self) -> List[Incident]:
        raise NotImplementedError

    def count_open_incidents(self) -> int:
        raise NotImplementedError

    def dismiss_all_open(self) -> int:
        raise NotImplementedError

    def get_paginated(
        self,
        search: Optional[str] = None,
        status: Optional[enums.IncidentStatus] = None,
        skip: int = 0,
        limit: int = 10,
    ) -> tuple[List[Incident], int]:
        raise NotImplementedError


class IncidentRepository(AbstractIncidentRepository, DatabaseRepository[Incident]):
    def __init__(self, session: Session) -> None:
        super().__init__(Incident, session)

    def get_by_session_id(self, session_id: int) -> Optional[Incident]:
        return self.session.scalars(
            select(Incident).where(Incident.session_id == session_id)
        ).first()

    def get_open_incidents(self) -> List[Incident]:
        return list(self.session.scalars(
            select(Incident)
            .where(Incident.status == enums.IncidentStatus.NEW)
            .where(Incident.deleted == False)  # noqa: E712
            .order_by(Incident.created_at.desc())
        ).all())

    def count_open_incidents(self) -> int:
        result = self.session.exec(
            select(func.count())
            .select_from(Incident)
            .where(Incident.status == enums.IncidentStatus.NEW)
            .where(Incident.deleted == False)  # noqa: E712
        ).first()
        return result or 0

    def dismiss_all_open(self) -> int:
        result = self.session.execute(
            update(Incident)
            .where(Incident.status == enums.IncidentStatus.NEW)
            .where(Incident.deleted == False)  # noqa: E712
            .values(status=enums.IncidentStatus.DISMISSED)
        )
        self.session.commit()
        return result.rowcount

    def get_paginated(
        self,
        search: Optional[str] = None,
        status: Optional[enums.IncidentStatus] = None,
        skip: int = 0,
        limit: int = 10,
    ) -> tuple[List[Incident], int]:
        query = select(Incident).where(Incident.deleted == False)  # noqa: E712

        if status is not None:
            query = query.where(Incident.status == status)

        if search:
            query = query.join(Incident.session).join(
                Process, Process.id == Incident.process_id
            ).filter(Process.name.ilike(f"%{search}%"))

        query = query.order_by(Incident.created_at.desc())

        count_query = select(func.count()).select_from(Incident).where(
            Incident.deleted == False  # noqa: E712
        )
        if status is not None:
            count_query = count_query.where(Incident.status == status)
        if search:
            count_query = count_query.join(Incident.session).join(
                Process, Process.id == Incident.process_id
            ).filter(Process.name.ilike(f"%{search}%"))

        total_count = self.session.exec(count_query).first()

        return (
            list(self.session.exec(query.offset(skip).limit(limit)).all()),
            total_count,
        )
