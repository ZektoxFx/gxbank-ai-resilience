'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, Gift, House, PiggyBank } from 'lucide-react';
import { user } from '@/lib/data';

const links = [
  { href: '/', label: 'Home', Icon: House },
  { href: '/pockets', label: 'Pockets', Icon: PiggyBank },
  { href: '/transfer', label: 'Transfer', Icon: ArrowLeftRight },
  { href: '/rewards', label: 'Rewards', Icon: Gift },
];

// Top bar on desktop; the links become a bottom tab bar on phones.
export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ground">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-8 px-4 sm:px-8">
        <Link href="/" aria-label="GXBank home" className="text-lg font-semibold tracking-tight">
          <span className="text-data">GX</span>Bank
        </Link>
        <nav
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 flex border-t border-line bg-ground pb-[env(safe-area-inset-bottom)] md:static md:gap-6 md:border-0 md:bg-transparent md:pb-0"
        >
          {links.map(({ href, label, Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors md:min-h-0 md:flex-none md:flex-row md:gap-2 md:text-sm ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <span
          title={user.name}
          aria-label={`Signed in as ${user.name}`}
          className="ml-auto flex size-8 items-center justify-center rounded-full bg-raised text-xs font-medium"
        >
          {user.initials}
        </span>
      </div>
    </header>
  );
}
