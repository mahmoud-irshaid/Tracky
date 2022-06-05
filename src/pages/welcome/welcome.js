import React from 'react';
import Style from './style.module.css'
import Footer from '../../components/footer';
import logo from '../../assets/loc2.svg'
import txt from '../../assets/tracky.svg'
import arrow from '../../assets/arrow.svg'
import feature3 from '../../assets/feature3.svg'
import message from '../../assets/message.svg'
import prev1 from '../../assets/prev1.svg'
import prev2 from '../../assets/prev2.svg'
import prev3 from '../../assets/prev3.svg'
import vector from '../../assets/vector.svg'




const Welcome = () => {
    return (
        <>
            <section>
                <div>
                    <img src={logo} className={Style.logo} loading='lazy' alt='tracky-logo' />
                    <img src={txt} className={Style.logo2} loading='lazy' alt='tracky-logo' />
                </div>
                <div className={Style.links}>
                    <a href='/signin'>
                        Join now
                    </a>
                    <a href='/login'>
                        Log in
                    </a>
                </div>
            </section>



            <main>
                <div className={Style.article1}>
                    <article>
                        <h1>
                            Welcome to <b>Tracky</b>
                        </h1>
                        <p>
                            The new way to connect with friends. A <br />
                            powerful features such as real-time GPS tracking, <wbr />
                            chatting and make more friends.
                        </p>
                        <a href='/signin'>Join now</a>
                    </article>

                    <img src={vector} alt='icon' />
                </div>




                <div>
                    <h3>
                        With Tracky will be easier and more fun
                    </h3>
                </div>




                <div className={Style.article2}>

                    <div>
                        <div>
                            <img src={arrow} alt='icon' />
                            <h4>Real-time tracking with friends</h4>
                        </div>
                        <p>
                            Connect with your online friends, Can know <wbr />
                            who of your friends wants to connect with you <wbr />
                            at the time, And start tracking each other.
                        </p>
                    </div>



                    <div>
                        <div>
                            <img src={message} alt='icon' />
                            <h4>Chatting within tracking </h4>
                        </div>
                        <p>
                            Simpling the way of chatting, On the map <wbr />
                            you can make a real-time chatting with your<wbr />
                            connected friend.
                        </p>
                    </div>



                    <div>
                        <div>
                            <img src={feature3} alt='icon' />
                            <h4>Relaibility and Ease of use</h4>
                        </div>
                        <p>
                            A high security and performance our most <wbr />
                            important aspects. And well user-friendly  <wbr />
                            design on all devices.
                        </p>
                    </div>

                </div>







                <div className={Style.article3}>
                    <section>
                        <img src={prev1} alt='icon' />
                        <h3>When your online friends want to connect with
                            you, their photos will start dimming.
                        </h3>
                    </section>

                    <section>
                        <h3>Real-time tracking of one friend.
                        </h3>
                        <img src={prev2} alt='icon' />
                    </section>

                    <section>
                        <img src={prev3} alt='icon' />
                        <h3>You can start chatting with your conncted friend
                            within map tracking.
                        </h3>
                    </section>
                </div>


                <div className={Style.article4}>
                    <h2>
                        Join Our Community
                    </h2>
                    <p>
                        contact us, we will be happy to answer all your questions.
                    </p>
                    <a href='mailto:mahmoudirshaid10@gmail.com'><p>Email us</p></a>
                </div>

            </main>



            <Footer />
        </>
    );
}

export default Welcome;