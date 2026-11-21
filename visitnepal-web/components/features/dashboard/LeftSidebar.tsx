'use client';

import React from 'react';

// ─── Type Definitions ─────────────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface LeftSidebarProps {
  navGroups: NavGroup[];
  activeId: string;
  onActiveChange: (id: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

// ─── Icon Primitive Helper ───────────────────────────────────────────────────
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ─── SidebarItem Component ───────────────────────────────────────────────────
interface SidebarItemProps extends NavItem {
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function SidebarItem({
  label,
  icon,
  badge,
  isActive,
  collapsed,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center transition-all duration-150 relative text-left cursor-pointer group ${
        collapsed ? 'justify-center py-2.5 px-0' : 'justify-start py-2.5 px-4 gap-3'
      } ${
        isActive
          ? 'bg-[#0552A2]/10 text-[#0552A2] font-semibold border-l-3 border-[#0552A2]'
          : 'text-slate-600 hover:text-[#17212B] hover:bg-slate-50 border-l-3 border-transparent font-medium'
      }`}
      style={{ fontSize: '13px' }}
    >
      <span
        className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isActive ? 'text-[#0552A2] opacity-100' : 'text-slate-400 group-hover:text-slate-600'
        }`}
      >
        <Icon d={icon} size={17} />
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate tracking-tight">
            {label}
          </span>
          {badge && (
            <span
              className={`rounded-full text-[10px] font-mono font-bold px-2 py-0.5 leading-none shrink-0 ${
                isActive
                  ? 'bg-[#0552A2] text-white'
                  : 'bg-slate-100 text-slate-600 group-hover:bg-[#0552A2]/10 group-hover:text-[#0552A2]'
              }`}
            >
              {badge}
            </span>
          )}
        </>
      )}

      {/* Collapsed notification indicator */}
      {collapsed && badge && (
        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#EC1F27]" />
      )}
    </button>
  );
}

// ─── SidebarGroup Component ──────────────────────────────────────────────────
interface SidebarGroupProps {
  title: string;
  items: NavItem[];
  activeId: string;
  collapsed: boolean;
  onItemClick: (id: string) => void;
}

function SidebarGroup({
  title,
  items,
  activeId,
  collapsed,
  onItemClick,
}: SidebarGroupProps) {
  return (
    <div className="py-2">
      {!collapsed && (
        <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400 px-4 pb-2 font-bold select-none">
          {title}
        </p>
      )}
      {collapsed && <div className="h-2" />}

      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
            isActive={activeId === item.id}
            collapsed={collapsed}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main LeftSidebar Component ──────────────────────────────────────────────
export default function LeftSidebar({
  navGroups,
  activeId,
  onActiveChange,
  collapsed,
  onCollapsedChange,
}: LeftSidebarProps) {
  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 h-full select-none bg-white border-r border-slate-200 transition-all duration-300 z-20 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Collapse / Expand Toggle Button */}
      <div
        className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3 py-2.5 flex items-center ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        {!collapsed && (
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
            Navigation
          </span>
        )}
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              <>
                <polyline points="9 18 15 12 9 6" />
              </>
            ) : (
              <>
                <polyline points="15 18 9 12 15 6" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Groups List */}
      <nav className="flex-1 overflow-y-auto divide-y divide-slate-100/80 py-2 scrollbar-thin">
        {navGroups.map((group) => (
          <SidebarGroup
            key={group.title}
            title={group.title}
            items={group.items}
            activeId={activeId}
            collapsed={collapsed}
            onItemClick={onActiveChange}
          />
        ))}
      </nav>

      {/* Footer Support / Portal Tag */}
      {!collapsed && (
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-500 font-medium">NTB System Active</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-snug">
            Nepal Tourism Board Official Portal
          </p>
        </div>
      )}
    </aside>
  );
}
