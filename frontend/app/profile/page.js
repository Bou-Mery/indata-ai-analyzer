"use client" ;

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';


function Profile() {

  const { data : session } =useSession();



  return (
    <div>
      { session ? (
      <h1>
      Hello {session.user.userName} , {session.user.email}  
    </h1>
    
  ): (
      <h1> not found</h1>
    )
      }
      
    </div>
  )
}

export default Profile