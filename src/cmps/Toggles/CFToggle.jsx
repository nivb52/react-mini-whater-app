import * as React from 'react';
// import Switch from '@mui/material/Switch';
import { Switch } from "@material-ui/core";
import { toggleCelsius } from '../../actions/WeatherActions'
import { useDispatch } from 'react-redux';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

// const { currentLocation } = useSelector(state => state.weatherModule)


export default function CFToggle() {
    const dispatch = useDispatch()


    const handleChange = (ev) => {
        console.log(ev.target.checked);
        dispatch(toggleCelsius())
    }





    return (
        <div>
            <Switch
                // checked={checked}
                onChange={handleChange}
                {...label} />
        </div>
    );
}