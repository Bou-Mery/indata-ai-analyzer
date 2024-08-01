'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/sign-in');
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src="/images/indata.png"
          width={80}
          height={80}
          className='object-contain'
        />
        <p className='logo_text'>INDATA</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        <div className="flex gap-3 md:gap-5">
          <Link href="/uploadfile" className='black_btn'>
            Upload File
          </Link>
          {session ? (
            <>
              <Link href="/historique" className='black_btn'>
                Historique
              </Link>
              <button type='button' onClick={handleSignOut} className='outline_btn'>
                Sign Out
              </button>
              <Link href="/profile" className='flex items-center'>
                <Image
                  src="/images/profile.jpg"
                  width={40}
                  height={40}
                  className='rounded-full'
                  alt="Profile"
                />
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className='black_btn'>
                Sign In
              </Link>
              <Link href="/sign-up" className='black_btn'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className='flex'>
          <FontAwesomeIcon
            icon={faBars}
            size='lg'
            onClick={() => setToggleDropdown((prev) => !prev)}
            className='cursor-pointer'
          />
          {toggleDropdown && (
            <div className='dropdown'>
              <Link
                href="/uploadfile"
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                Upload File
              </Link>
              {session ? (
                <>
                  <Link
                    href="/historique"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className='dropdown_link flex items-center'
                    onClick={() => setToggleDropdown(false)}
                  >
                    <Image
                      src={session.user.image || "/images/default-avatar.png"}
                      width={40}
                      height={40}
                      className='rounded-full'
                      alt="Profile"
                    />
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      handleSignOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
