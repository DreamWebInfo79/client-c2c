import React from 'react';

const TermsAndConditions = () => {
    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333'
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px'
    };

    const sectionStyle = {
        marginBottom: '20px',
        borderBottom: '1px solid #ccc'
    };

    const listStyle = {
        paddingLeft: '20px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Terms and Conditions</h1>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>1. Introduction</h2>
                <p>Welcome to our old car selling website. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.</p>
                <p>These terms and conditions outline the rules and regulations for the use of our website, located at [website URL].</p>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>2. Use of the Website</h2>
                <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
                <p>Prohibited behavior includes, but is not limited to:</p>
                <ul style={listStyle}>
                    <li>Harassing or abusing other users</li>
                    <li>Using the website for any illegal or unauthorized purpose</li>
                    <li>Using the website to post or transmit any infringing, threatening, false, misleading, or fraudulent material</li>
                    <li>Using the website to post or transmit any material that contains viruses or other harmful content</li>
                    <li>Disrupting the normal functioning of the website</li>
                </ul>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>3. User Accounts</h2>
                <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
                <p>You are responsible for maintaining the confidentiality of your account and password and for any and all activities that occur under your account.</p>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>4. Listings</h2>
                <p>All listings must be accurate and not misleading. You are responsible for ensuring that your listings comply with all applicable laws and regulations.</p>
                <p>You agree not to post any false, inaccurate, misleading, defamatory, or libelous content.</p>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>5. Payments</h2>
                <p>All payments for cars must be made through the website's secure payment system. We are not responsible for any issues arising from payments made outside of this system.</p>
                <p>We accept the following payment methods:</p>
                <ul style={listStyle}>
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>PayPal</li>
                </ul>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>6. Limitation of Liability</h2>
                <p>We are not liable for any loss or damage that may come from using our website. This includes any direct, indirect, or consequential losses.</p>
                <p>We are not responsible for any issues arising from the use of our website, including but not limited to:</p>
                <ul style={listStyle}>
                    <li>Any errors or inaccuracies in the content on our website</li>
                    <li>Any interruptions or cessation of the website</li>
                    <li>Any viruses or other harmful content that may be transmitted to your computer</li>
                    <li>Any unauthorized access to or use of our secure servers</li>
                    <li>Any personal or sensitive information that may be transmitted to our website</li>
                </ul>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>7. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. You should check this page regularly to ensure you are aware of any changes.</p>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={headerStyle}>8. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at support@oldcarsellingwebsite.com.</p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
