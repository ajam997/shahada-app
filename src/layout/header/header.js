import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './Header.css';
import { ThemeContext } from '../../context/theme/ThemeContext';

const Header = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:700px)');
    const iconColor = darkMode ? '#ffffff' : '#1B1C1E';

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <List>
            {['HOME', 'ABOUT US', 'BLOG', 'CONTACT'].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <CssBaseline />
            <AppBar position="static" className={`header ${darkMode ? 'dark' : 'light'}`}>
                <Toolbar className='toolbar'>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <div className="logo">SHAHADA</div>
                    {!isMobile && (
                        <div className="links">
                            {['HOME', 'ABOUT US', 'BLOG', 'CONTACT'].map((text) => (
                                <Typography variant="body1" key={text}>
                                    {text}
                                </Typography>
                            ))}
                        </div>
                    )}
                    <span className='util'>
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <div className="search">
                            <svg
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ stroke: iconColor }}
                            >
                                <path
                                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22 23L20 21"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </span>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>
        </>
    );
}

export default Header;