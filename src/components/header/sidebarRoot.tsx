"use client";

import { Button, Tooltip } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

import {
  CollapseTrueIcon,
  CollapseFalseIcon,
  HomeIcon,
  ReportIcon,
} from "@/components";
import { useSidebar } from "@/app/providers";
import { usePermissions } from "@/utils/context/PermissionContext";

export const SidebarRoot = () => {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { can } = usePermissions();
  const CollapseIcon = collapsed ? CollapseFalseIcon : CollapseTrueIcon;
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { label: "Inicio", href: "/", icon: HomeIcon },
    {
      label: "Reportes",
      href: "/reports",
      icon: ReportIcon,
      visible: can("sales.reports", "read") && can("sales.reports", "download"),
    },
  ].filter((item) => item.visible !== false);

  return (
    <aside
      className={`text-black transition-all duration-300 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col ${
        collapsed ? "w-14" : "w-60"
      }`}
    >
      <div
        className={`flex flex-col gap-2 p-2 overflow-y-auto grow max-h-full`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {menuItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Tooltip key={label} isDisabled={!collapsed}>
              <Tooltip.Trigger>
                <Button
                  className={`w-full flex items-center py-2 transition-all duration-300 ${
                    collapsed
                      ? "justify-center px-0"
                      : "justify-start gap-2 px-3"
                  } ${
                    isActive
                      ? "bg-green-200 dark:bg-green-950"
                      : "bg-transparent"
                  }`}
                  variant="ghost"
                  onPress={() => router.push(href)}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span
                      className="text-base font-medium truncate"
                      style={{ maxWidth: "calc(100% - 1.25rem)" }}
                    >
                      {label}
                    </span>
                  )}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content showArrow placement="right">
                <Tooltip.Arrow />
                <span>{label}</span>
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </div>

      <div
        className={`mt-auto p-2 flex transition-all duration-300 ${
          collapsed
            ? "flex-col items-center gap-2"
            : "items-center justify-between"
        }`}
      >
        <h2
          className={`text-xl font-bold tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden ${
            collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-full"
          }`}
        >
          Menú
        </h2>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              className="flex items-center justify-center"
              variant="secondary"
              onPress={toggleCollapsed}
            >
              <CollapseIcon />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="top">
            <Tooltip.Arrow />
            <span>{collapsed ? "Expandir menú" : "Colapsar menú"}</span>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </aside>
  );
};
