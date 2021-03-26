import React from 'react'
const ErrorPage = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p style={{fontSize: '10rem', position: 'absolute', top: '10rem', color: 'white'}}>404</p>
            <h1 style={{ position: 'absolute', top: '30rem', color: 'white'}}>Oh no! We are lost in space...</h1>
            <img src='https://myplanits.s3-us-west-1.amazonaws.com/lost.gif' style={{margin: '1rem', borderRadius: '2rem',maxHeight: '40rem', maxWidth: '40rem'}} />
        </div>
    )
}
export default ErrorPage;