import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', color: 'white', backgroundColor: 'black'}}>
                <p style={{ color: 'white', margin: '2px 0rem 1px 0rem'}}>Created by:</p>
                <p style={{ color: 'white', margin: '0rem 0rem 1px 0rem' }}>Nicole Loescher</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'black'}}>
                <a href='https://github.com/nicole-loescher' style={{margin: '2rem 2rem 2rem 2rem'}}>
                    <GitHubIcon style={{ color: 'white', fontSize: '3rem' }} />
                </a>
                <a href='https://www.linkedin.com/in/nicole-marie-loescher/' style={{ margin: '2rem 2rem 2rem 2rem' }}>
                    <LinkedInIcon style={{color: 'white', fontSize: '3rem'}} />
                </a>
                <a href='https://www.nicole-loescher.herokuapp.com' style={{ margin: '2rem 2rem 2rem 2rem' }}>
                    <LanguageIcon style={{ color: 'white', fontSize: '3rem' }} />
                </a>
        
            </div>
        </div>
    )
}
export default Footer;