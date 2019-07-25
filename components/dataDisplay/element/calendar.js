import React, { useState } from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Calendar = () => {

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [enteredTo, setEnteredTo] = useState(null);

    const isSelectingFirstDay = (from, to, day) => {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    }

    const handleDayClick = (day) => {
        if (from && to && day >= from && day <= to) {
            handleResetClick();
            return;
        }
        if (isSelectingFirstDay(from, to, day)) {
            setFrom(day);
            setTo(null);
            setEnteredTo(null);
        } else {
            setTo(day)
            setEnteredTo(day)
        }
    }

    const handleDayMouseEnter = (day) => {
        if (!isSelectingFirstDay(from, to, day)) {
            setEnteredTo(day)
        }
    }

    const handleResetClick = () => {
        setFrom(null);
        setTo(null);
        setEnteredTo(null);
    }

    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: from };
    const selectedDays = [from, { from, to: enteredTo }];
    
    return (
        <div style={{width: "90%", backgroundColor: "#F4F3F8", margin: "2rem"}}>
            <h2 style={{textDecoration: "underline red", paddingLeft: "2rem"}}>Date de la campagne</h2>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            style={{padding:"2rem 0"}}
            >
            <div style={{backgroundColor: "white"}}>
            <DayPicker
                className="Range"
                numberOfMonths={1}
                fromMonth={from}
                selectedDays={selectedDays}
                disabledDays={disabledDays}
                modifiers={modifiers}
                onDayClick={handleDayClick}
                onDayMouseEnter={handleDayMouseEnter}
            />
            </div>
            
            <div>
                {from && to && (
                    <Button variant="outlined" style={{borderColor: "rgb(220, 0, 78)", color: "rgb(220, 0, 78)"}}>
                        Du {from.toLocaleDateString()} au {to.toLocaleDateString()}
                    </Button>
                    )    
                }
                {!to && (
                    <Button variant="outlined" style={{borderColor: "rgb(220, 0, 78)", color: "rgb(220, 0, 78)"}}>
                        Choissisez une période
                    </Button>
                    )    
                }
            </div>
            <Helmet>
                <style>{`
                    .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: #4a90e2;
                    }
                    .Range .DayPicker-Day {
                        border-radius: 0 !important;
                    }
            `}</style>
            </Helmet>
            </Grid>
        </div>
    );
}

export default Calendar;