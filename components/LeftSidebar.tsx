import React from 'react';

interface LeftSidebarProps {
  isOpen: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: 'home', text: 'Лента', active: true },
    { icon: 'trending_up', text: 'Популярное' },
    { icon: 'groups', text: 'Сообщества' },
  ];

  const navItems = [
    { icon: 'info', text: 'О Postrr' },
    { icon: 'campaign', text: 'Реклама' },
    { icon: 'help_center', text: 'Справка' },
    { icon: 'currency_exchange', text: 'Инвесторам' },
  ];

  const legalItems = [
    { icon: 'gavel', text: 'Правила Postrr' },
    { icon: 'policy', text: 'Политика конфиденциальности' },
    { icon: 'description', text: 'Пользовательское соглашение' },
  ];

  const renderItem = (item: { icon: string; text: string; active?: boolean }, index: number) => (
    <button
      key={index}
      className={`
        w-full flex items-center gap-4 px-4 py-3 
        rounded-xl text-left transition-colors duration-200
        ${item.active 
          ? 'bg-[#2C3236] text-white' 
          : 'text-gray-400 hover:bg-[#2C3236]/50 hover:text-gray-200'
        }
      `}
    >
      <span className="material-symbols-rounded text-[24px]">{item.icon}</span>
      <span className="font-medium text-[15px]">{item.text}</span>
    </button>
  );

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-[280px] 
        bg-[#0F1113] border-r border-[#3F4142]
        pt-[72px] pb-4 px-4
        transform transition-transform duration-300 ease-in-out z-40
        overflow-y-auto no-scrollbar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Section 1 */}
      <div className="flex flex-col gap-1 mb-2">
        {menuItems.map(renderItem)}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#26282A] w-full my-2" />

      {/* Section 2 */}
      <div className="flex flex-col gap-1 mb-2">
        <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
          Навигация
        </h3>
        {navItems.map(renderItem)}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#26282A] w-full my-2" />

      {/* Section 3 */}
      <div className="flex flex-col gap-1">
        {legalItems.map(renderItem)}
      </div>
    </aside>
  );
};