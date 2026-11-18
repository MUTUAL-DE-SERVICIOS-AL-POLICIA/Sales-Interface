"use client";

import { Link, Tooltip } from "@heroui/react";

import { UserSession } from "./userSession";

import { ThemeSwitch, Logo, Search } from "@/components";
import { User } from "@/utils/interfaces";
import { usePermissions } from "@/utils/context/PermissionContext";
import { searchPerson } from "@/api";

interface Props {
  user: User;
  environment: string;
  computerToolName: string;
  hubUrl: string;
  logoutUrl: string;
}

export const Navbar = ({
  user,
  environment,
  computerToolName,
  hubUrl,
  logoutUrl,
}: Props) => {
  const { can } = usePermissions();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <Tooltip delay={0}>
            <Link
              className="flex justify-start items-center gap-1"
              href={hubUrl}
            >
              <Logo height={30} width={80} />
            </Link>
            <Tooltip.Content showArrow placement="right">
              <Tooltip.Arrow />
              <p>Ir a inicio</p>
            </Tooltip.Content>
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center text-center leading-tight">
            <span className="font-bold text-md uppercase">
              {computerToolName}
            </span>
            {(environment === "dev" || environment === "test") && (
              <span className="mt-1 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-sm shadow-xs shadow-red-300 border border-white/20">
                {environment === "test"
                  ? "VERSIÓN DE PRUEBAS"
                  : "VERSIÓN DE DESARROLLO"}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {can("persons", "read") && (
            <div className="flex flex-col items-center text-center leading-tight">
              <Search searchPerson={searchPerson} />
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <ThemeSwitch />
          <div className="hidden md:flex">
            <UserSession
              name={user.name}
              username={user.username}
              email={user.email}
              groups={user.groups}
              clientRoles={user.clientRoles}
              logoutUrl={logoutUrl}
            />
          </div>
        </div>
      </header>
    </nav>
  );
};
