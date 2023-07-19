import React from 'react';
import FileUploader from '../components/FileUploader';
import confirmationEmailImage from '../images/guide/confirmation_email.png';
import dataReadyEmailImage from '../images/guide/data_ready_email.png';

const Guide = () => {
    return (
        <article>
            <h2>To render your music river, first upload your Spotify listening history</h2>
            <p>In order to generate your history graph, you'll need to download your Extended Streaming History from Spotify and upload it to Riverify.</p>
            <div className='step'>
                <h3>1</h3>
                <p>To do so, visit <a href="https://www.spotify.com/ca-en/account/privacy">Spotify's Privacy Settings</a> and scroll to the bottom section, "Download your data." Request <strong>Extended Streaming History</strong> (Account data and Technical log information are not necessary).</p>
                <img alt="PLACEHOLDER FOR A SCREENSHOT" />
            </div>
            <div className='step'>
                <h3>2</h3>
                <p>If you're asked to confirm your request through an email, do so:</p>
                <img src={confirmationEmailImage} alt="Confirmation email" />
            </div>
            <div className='step'>
                <h3>3</h3>
                <p>Return to the privacy settings page. The "Download your data" section should now look like this:</p>
                <img alt="PLACEHOLDER FOR A SCREENSHOT" />
            </div>
            <div className='step'>
                <h3>4</h3>
                <p>Now, wait for the arrival of your data dump by email. Regrettably, as indicated on the page, <strong>the Extended Streaming History data can take anywhere from 1 to 30 days for Spotify to compile,</strong> so you may have to wait a while. Unfortunately there's no way to work around this waiting period, but this website will remain ready to generate your music river graph when you receive your data.</p>
                <img alt="PLACEHOLDER FOR A SCREENSHOT OR ICON" />
            </div>
            <div className='step'>
                <h3>5</h3>
                <p>Once you receive the data by email, click the provided link to download the file.</p>
                <img src={dataReadyEmailImage} alt="Screenshot of an email from Spotify saying the data is ready" />
            </div>
            <div className='step'>
                <h3>6</h3>
                <p>The file will likely be called <tt>my_spotify_data.zip</tt>. Upload it below:</p>
                <FileUploader />
            </div>

            <p>You can order prints of your river image or divide it by year across many prints.</p>
        </article>
    );
};

export default Guide;
