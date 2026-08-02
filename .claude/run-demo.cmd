@echo off
set "PATH=C:\Users\Torben\AppData\Local\mise\installs\node\24.18.1;C:\Users\Torben\AppData\Local\mise\installs\pnpm\11.18.0;%PATH%"
cd /d "P:\Dev\starlight-ai-label"
pnpm --filter demo dev
