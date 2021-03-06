import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import './style.css'

interface IRadialChart {
    color?: string,
    textColor?: string,
    progress: number,
    unit?: string,
    animationTime?:number
}

const RadialChart = ({ color='#818893', progress, textColor='#d1dbe7', unit, animationTime=900 }: IRadialChart) => {

    const [strokeLength, setStrokeLength] = useState(0);
    const [valueCounter, setValueCounter] = useState(0);
    const radius = 80;
    const strokeWidth = 10;

    const dimension = 180;
    const circleRadius = Math.min(radius, 85); 
    const circumference = 2 * 3.14 * circleRadius;


    useEffect(() => {
        setStrokeLength(circumference / 100 * progress);
        animateValue(valueCounter > 0 ? valueCounter : 0,progress,animationTime);
    }, [progress])



    const  animateValue = (start:number, end:number, duration:number)=>{
        let startTimestamp:any = null;
        const step = (timestamp:any) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          setValueCounter(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

    return (
        
        <div
            className={classNames('radial-chart', {
                'no-progress': strokeLength === 0
            })}
        >
            <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
                <circle
                    className="radial-chart-total"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    cx="90"
                    cy="90"
                    r={circleRadius}
                />
                <circle
                    className="radial-chart-progress"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeLength},${circumference}`}
                    strokeLinecap="round"
                    fill="none"
                    cx="90"
                    cy="90"
                    r={circleRadius}
                />
                <text x="50%" y="50%" fill={textColor} fontSize='2.5em' dominantBaseline="middle" textAnchor="middle">{valueCounter}</text> 
        <text x="50%" y="58%" fill={textColor} fontSize='1em' fillOpacity={.5}  dominantBaseline="hanging" textAnchor="middle">{unit}</text> 
            </svg>
        </div>
    )
}

export default RadialChart
