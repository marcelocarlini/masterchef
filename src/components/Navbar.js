import React from 'react'
import chef from '../img/chef.png'

const Navbar = () => {
    return (
        <nav class="navbar shadow rounded-bottom bg-black fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand mx-auto " href="#">
                    <img src={chef} width={50} height={54} />
                    <b className='text-white'>MasterChef</b>
                </a>
            </div>
        </nav>

    )
}

export default Navbar;