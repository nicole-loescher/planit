import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div style={{ backgroundColor: 'rgb(13, 13, 57)'}}>
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
                <p style={{ color: 'white', margin: '2px 0rem 1px 0rem'}}>Created by:</p>
                <p style={{ color: 'white', margin: '0rem 0rem 2px 0rem' }}>Nicole Loescher</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <a href='https://github.com/nicole-loescher' style={{ boxSizing: 'border-box', margin: '0rem 2rem 2rem 2rem'}}>
                    <GitHubIcon style={{ boxSizing: 'border-box', color: 'white', fontSize: '40px' }} />
                </a>
                <a href='https://www.linkedin.com/in/nicole-marie-loescher/' style={{ boxSizing: 'border-box', margin: '0rem 2rem 2rem 2rem' }}>
                    <LinkedInIcon style={{ boxSizing: 'border-box', color: 'white', fontSize: '48px'}} />
                </a>
                <a href='https://www.nicole-loescher.herokuapp.com' style={{ boxSizing: 'border-box', margin: '0rem 2rem 2rem 2rem' }}>
                    <LanguageIcon style={{ boxSizing: 'border-box', color: 'white', fontSize: '48px' }} />
                </a>
        
            </div>
        </div>
    )
}
export default Footer;