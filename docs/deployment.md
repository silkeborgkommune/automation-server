# Deployment

## Installation

### Development Setup

Development uses `docker-compose.override.yml` which is automatically applied on top of the production base. It builds from local source, exposes ports, and adds dev defaults.

```bash
# Standard development setup
docker compose up -d

# With optional database admin tool (Adminer on port 8080)
docker compose --profile tools up -d
```

### Production Setup

Production uses only the base `docker-compose.yml` with pre-built images from GHCR. No credentials have defaults — a `.env` file is required.

```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with your values (database credentials, tokens, etc.)

# Start production services
docker compose -f docker-compose.yml up -d
```

## Configuration

### Environment Variables

Key configuration options in `.env`:

```bash
# Database
POSTGRES_USER=ats_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=ats

# Workers
ATS_TOKEN=your-api-token-here   # Can be left blank for development
ATS_CAPABILITIES=playwright     # Additional capabilities

# Timezone
TZ=Europe/Copenhagen
```

### Deployment Scenarios

#### Standalone (ATS owns the server)

The proxy binds to port 80 by default. This works out of the box for a server dedicated to ATS.

```bash
# .env — use the default or set explicitly
HTTP_PORT=80
```

SSL can be added by modifying `nginx.conf` and mounting a certificate volume into the proxy service.

#### Behind a Reverse Proxy (Caddy, Traefik, etc.)

Set ATS to bind on an internal port and point your external proxy to it. SSL is terminated by the external proxy — no SSL config needed in ATS.

```bash
# .env
HTTP_PORT=8080
```

Then configure your reverse proxy to forward to `http://localhost:8080`.

## Adding More Workers

Scale workers by adding entries to `docker-compose.yml` (production) or `docker-compose.override.yml` (development):

```yaml
worker03:
  <<: *worker-template
  hostname: worker-03
```

## Usage

TODO: Write a process development guide.
