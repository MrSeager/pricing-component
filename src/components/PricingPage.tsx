import React, { FC, useState } from 'react';
//Components
import './PricongPageStyle.css';
import PlanPage from './PlanPage.tsx';
import PlanPageMid from './PlanPageMid.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

const PricingPage: FC = () => {
    const [plan, setPlan] = useState('annually');

    const springOp = useSpring({
        from: { opacity: 0 }, 
        to: { opacity: 1 }, 
        config: { tension: 200, friction: 20 }, 
        delay: 200, 
    });

    const middleSpring = useSpring({
        from: { y: '100px', opacity: 0 }, 
        to: { y: '0px', opacity: 1 }, 
        config: { tension: 200, friction: 20 }, 
        delay: 200, 
    }); 
    
    const leftSpring = useSpring({
        from: { x: '370px',  opacity: 0 }, 
        to: { x: '0px',  opacity: 1 }, 
        config: { tension: 150, friction: 20 }, 
        delay: 600,
    });

    const rightSpring = useSpring({
        from: { x: '-370px',  opacity: 0 }, 
        to: { x: '0px',  opacity: 1 }, 
        config: { tension: 150, friction: 20 }, 
        delay: 600,
    });

    const numbProps = {
        annually: {
            basic: 199.99,
            profesional: 249.99,
            master: 399.99,
        },
        monthly: {
            basic: 19.99,
            profesional: 24.99,
            master: 39.99,
        }
    };

    const handleSwitch = () => { 
        setPlan((prevPlan) => (prevPlan === 'annually' ? 'monthly' : 'annually')); 
    };

    return (
        <Container fluid className='p-0 min-vh-100 cs-bg-image d-flex flex-column align-items-center justify-content-center overflow-hidden'>
            <Container fluid className='d-flex flex-column align-items-center gap-3'>
                <animated.div style={springOp}>
                    <h1 className='cs-tc-grayish-blue text-center'>Our Pricing</h1>
                    <Container fluid className='cs-tc-light-grayish-grey d-flex flex-row align-items-center justify-content-center'>
                        <h2 className='h6 m-0 pe-2'>Annually</h2>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            className='ms-0 me-0 cs-switch'
                            onClick={handleSwitch}
                            label='Monthly'
                        />
                    </Container>
                </animated.div>
                <Container fluid className='cs-w m-0'>
                    <Row>
                        <Col lg={4} xs={12} className='py-4 px-0'>
                            <animated.div style={leftSpring} className='cs-index-1'>
                                <PlanPage 
                                    csClass='cs-rounded-left'
                                    plan='Basic'
                                    cost={numbProps[`${plan}`].basic}
                                    par1='500 GB Storage'
                                    par2='2 Users Allowed'
                                    par3='Send up to 3 GB'
                                />
                            </animated.div>
                        </Col>
                        <Col lg={4} xs={12} className='px-0 cs-index-2'>
                            <animated.div style={middleSpring} className='h-100'>
                                <PlanPageMid
                                    plan='Professional'
                                    cost={numbProps[`${plan}`].profesional}
                                    par1='1 TB Storage'
                                    par2='5 Users Allowed'
                                    par3='Send up to 10 GB'
                                />
                            </animated.div>
                        </Col>
                        <Col lg={4} xs={12} className='py-4 px-0'>
                            <animated.div style={rightSpring} className='cs-index-1'>
                                <PlanPage 
                                    csClass='cs-rounded-right'
                                    plan='Master'
                                    cost={numbProps[`${plan}`].master}
                                    par1='2 TB Storage'
                                    par2='10 Users Allowed'
                                    par3='Send up to 20 GB'
                                />
                            </animated.div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    );
}

export default PricingPage;