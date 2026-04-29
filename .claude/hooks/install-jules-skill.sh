#!/bin/bash
set -uo pipefail

SKILL_DIR="$HOME/.claude/skills/jules-proxy"
SKILL_FILE="$SKILL_DIR/SKILL.md"
SKILL_URL="https://jules-proxy-mhgmawcn3a-rj.a.run.app/skill.md"

# Skip if installed and < 24h old
if [ -f "$SKILL_FILE" ]; then
  if find "$SKILL_FILE" -mtime -1 -print -quit | grep -q .; then
    exit 0
  fi
fi

mkdir -p "$SKILL_DIR"
if curl -fsSL --max-time 10 "$SKILL_URL" -o "$SKILL_FILE.tmp" 2>/dev/null; then
  mv "$SKILL_FILE.tmp" "$SKILL_FILE"
else
  echo "[install-jules-skill] WARN: failed to fetch $SKILL_URL — skill not installed" >&2
  rm -f "$SKILL_FILE.tmp"
fi
exit 0
