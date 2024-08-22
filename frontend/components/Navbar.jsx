'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitch from './ThemeSwitch';

function Navbar() {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/sign-in');
  };

  const handleMouseOver = () => {
    setShowLabel(true);
  };

  const handleMouseOut = () => {
    setShowLabel(false);
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src="/images/indata.png"
          width={80}
          height={80}
          className='object-contain'
          alt="InData"
        />
        <p className='logo_text'>INDATA</p>
      </Link>
      {/*<Link href='https://www.ocpgroup.ma/' target="_blank"  className='flex gap-2 flex-center'>
        <Image
          src="/images/ocplogo.jpg"
          width={100}
          height={100}
          className='object-contain'
          alt="OCP"
        />
      </Link>*/}

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        <div className="flex gap-3 md:gap-5 items-center">
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
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Image
                  src="/images/profile.jpg"
                  width={40}
                  height={40}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className='rounded-full cursor-pointer'
                  alt="Profile"
                />
                {showLabel && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgb(0, 141, 227)',
                      color: 'white',
                      padding: '5px',
                      borderRadius: '5px',
                      marginTop: '5px',
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                      fontWeight :'bold',
                    }}
                  >
                    {session.user.email}
                  </div>
                )}
              </div>
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
          <ThemeSwitch />
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
                    Historique
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
              <ThemeSwitch />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
