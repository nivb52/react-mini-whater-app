import * as React from 'react';
import { Switch } from "@material-ui/core";
import { toggleCelsius } from '../../actions/WeatherActions'
import { useDispatch } from 'react-redux';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function CFToggle() {
    const dispatch = useDispatch()

    const handleChange = (ev) => {
        dispatch(toggleCelsius())
    }

    return (
        <div>
            <Switch
                onChange={handleChange}
                {...label} />
        </div>
    );
}