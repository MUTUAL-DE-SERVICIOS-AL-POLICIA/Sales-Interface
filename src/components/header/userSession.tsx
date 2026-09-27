"use client";

import { Avatar, Button, Description, Dropdown, Label } from "@heroui/react";

import { LogoutIcon } from "@/components";

interface Props {
  username: string;
  name: string;
  email?: string;
  groups: readonly string[];
  clientRoles: readonly string[];
  logoutUrl: string;
}

const badges = (values: readonly string[]) => (
  <div className="flex flex-wrap gap-1.5">
    {values.map((value) => (
      <span
        key={value}
        className="max-w-full truncate rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200"
        title={value}
      >
        {value}
      </span>
    ))}
  </div>
);

export const UserSession = ({
  username,
  name = "Usuario",
  email,
  groups,
  clientRoles,
  logoutUrl,
}: Props) => {
  const visibleRoles = clientRoles.filter((role) => role !== "user");

  return (
    <Dropdown>
      <Button
        aria-label="Información de la sesión"
        className="border-0"
        variant="ghost"
      >
        <Avatar size="sm">
          <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col text-left">
          <Label>{name}</Label>
          <Description>{username}</Description>
        </div>
      </Button>
      <Dropdown.Popover className="w-80">
        <Dropdown.Menu aria-label="Información de la sesión">
          <Dropdown.Section>
            <Dropdown.Item id="profile" textValue="Perfil del usuario">
              <div className="space-y-1 overflow-hidden py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  <p className="font-semibold text-green-700 dark:text-green-400">
                    Sesión activa
                  </p>
                </div>
                <p className="truncate font-medium" title={name}>
                  {name}
                </p>
                <p className="truncate text-xs text-gray-500" title={username}>
                  @{username}
                </p>
                <p className="truncate text-xs text-gray-500" title={email}>
                  {email ?? "Correo no registrado"}
                </p>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
          {groups.length > 0 ? (
            <Dropdown.Section>
              <Dropdown.Item id="groups" textValue="Grupos del usuario">
                <div className="space-y-2 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Grupos
                  </p>
                  {badges(groups)}
                </div>
              </Dropdown.Item>
            </Dropdown.Section>
          ) : null}
          {visibleRoles.length > 0 ? (
            <Dropdown.Section>
              <Dropdown.Item id="roles" textValue="Roles de la herramienta">
                <div className="space-y-2 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Roles de la herramienta
                  </p>
                  {badges(visibleRoles)}
                </div>
              </Dropdown.Item>
            </Dropdown.Section>
          ) : null}
          <Dropdown.Section>
            <Dropdown.Item
              id="logout"
              textValue="Cerrar sesión"
              variant="danger"
              href={logoutUrl}
            >
              <div className="flex items-center gap-2 py-1">
                <LogoutIcon />
                <div className="flex flex-col">
                  <Label>Cerrar sesión</Label>
                  <Description>Salir de la aplicación</Description>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
