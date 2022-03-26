import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faCaretDown,faRightFromBracket,faUser } from '@fortawesome/free-solid-svg-icons'
import {Button,Menu,MenuItem} from '@mui/material';

import styles from '../styles/Header.module.css'
import { getUserById } from '../actions/user';

const Header = ({userId,setUserId}) => {
    const [name,setName] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = ()=>{
        handleClose();
        localStorage.removeItem('userId');
        setUserId(null);
    }

    useEffect(async()=>{
        const data = await getUserById(userId);
        setName(data?.name?.split(' ')[0]);
    },[userId]);
    return (
        <div className={styles.header}>
            <Link to="/">
                <div className={styles.brand}>
                    FOODIFY
                </div>
            </Link>
            <div className={styles.items}>
                <div className={styles.cart}>
                    <Link to="/cart">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                </div>
                {
                    userId ?
                    <>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className={styles.dropdown}
                        >
                            <span className={styles.dropdownName}>Hi, {name} </span>
                            <FontAwesomeIcon icon={faCaretDown} className={styles.button} />

                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            
                        >   
                            <Link to="/profile">
                                <MenuItem onClick={handleClose} className={styles.menu}> <FontAwesomeIcon icon={faUser} className={styles.button}/> My Profile</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogout} className={styles.menu}> <FontAwesomeIcon icon={faRightFromBracket} className={styles.button} /> Logout</MenuItem>
                        </Menu>
                    </>
                    :     
                    <Link to='/auth'>
                        <div className={styles.login}>
                            Login 
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header
