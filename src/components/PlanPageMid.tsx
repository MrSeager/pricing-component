import React, { FC, useState, useEffect } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface PlanPageProps {
    plan: string;
    cost: number;
    par1: string;
    par2: string;
    par3: string;
}

const PlanPageMid: FC<PlanPageProps> = ({ plan, cost, par1, par2, par3 }) => {
    const [displayCost, setDisplayCost] = useState(cost); 
    
    useEffect(() => { 
        setDisplayCost(cost); 
    }, [cost]); 
    
    const costSpring = useSpring({ 
        from: { number: displayCost }, 
        number: cost, 
        config: { tension: 220, friction: 24 }, 
    });
    
    const gradientSpring = useSpring({ 
        from: { backgroundPosition: '50% 0%' }, 
        to: async (next) => { 
            while (true) { 
                await next({ backgroundPosition: '50% 100%' }); 
                await next({ backgroundPosition: '50% 0%' }); 
            } 
        }, 
        config: { duration: 5000 },
    });
    
    
    return (
        <animated.div 
            style={{ 
                ...gradientSpring, 
                background: 'linear-gradient(180deg, rgba(105,111,221,1) 0%, rgba(163,168,240,1) 50%, rgba(105,111,221,1) 100%)', 
                backgroundSize: '200% 200%',
            }}
            className='h-100 text-white shadow p-4 rounded-4 d-flex flex-column text-center align-items-center justify-content-center gap-4'>
            <h3 className='m-0 h4'>{plan}</h3>
            <animated.h4 className='display-1'>{costSpring.number.to(n => `$${n.toFixed(2)}`)}</animated.h4>
            <ListGroup className='w-100'>
                <ListGroup.Item className='text-white bg-transparent border-start-0 border-end-0 rounded-0 py-3'>{par1}</ListGroup.Item>
                <ListGroup.Item className='text-white bg-transparent border-start-0 border-end-0 rounded-0 py-3'>{par2}</ListGroup.Item>
                <ListGroup.Item className='text-white bg-transparent border-start-0 border-end-0 rounded-0 py-3'>{par3}</ListGroup.Item>
            </ListGroup>
            
            <Button type='button' className='py-2 w-100 cs-btn-2 bg-white'>Learn More</Button>
        </animated.div>
    );
}

export default PlanPageMid;