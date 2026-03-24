param(
  [switch]$Clean
)

$ErrorActionPreference = "Stop"

Write-Host "Preparando ambiente para instalar as bibliotecas..." -ForegroundColor Cyan

if ($Clean) {
  Write-Host "Removendo node_modules e lockfile para reinstalacao limpa..." -ForegroundColor Yellow
  if (Test-Path "node_modules") { Remove-Item "node_modules" -Recurse -Force }
  if (Test-Path "pnpm-lock.yaml") { Remove-Item "pnpm-lock.yaml" -Force }
}

if (-not (Get-Command corepack -ErrorAction SilentlyContinue)) {
  throw "Corepack nao encontrado. Instale o Node.js 16.10+ para continuar."
}

Write-Host "Ativando o pnpm via Corepack..." -ForegroundColor Cyan
corepack enable

Write-Host "Instalando dependencias do projeto..." -ForegroundColor Green
corepack pnpm install

Write-Host ""
Write-Host "Dependencias instaladas com sucesso." -ForegroundColor Green
Write-Host "Para rodar o projeto: corepack pnpm dev" -ForegroundColor Cyan
