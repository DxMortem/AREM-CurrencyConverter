import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './dollar-symbol.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './App.css';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

class App extends Component {

    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>
                        Currency Converter
                    </h1>
                </header>
                <main className="layout">
                    <Paper className="paper">

                        <FormControl margin="normal">
                            <InputLabel>Source Amount</InputLabel>
                            <Input type="numeric" id="sourceAmount"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="sourceCurrency">
                                Source Currency
                            </InputLabel>
                            <Select
                                autoWidth="true"
                                value={""}//this.state.age}
                                id="sourceCurrency"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                            </Select>
                        </FormControl>

                        <FormControl margin="normal">
                            <InputLabel>Target Amount</InputLabel>
                            <Input type="numeric" id="targetAmount"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="targetCurrency">
                                Target Currency
                            </InputLabel>
                            <Select
                                autoWidth="true"
                                value={""}//this.state.age}
                                id="targetCurrency"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                            </Select>
                        </FormControl>
                        <br/>
                        <Button variant={"raised"} color={"primary"}>Convert</Button>
                        <br/>
                        <Button variant={"raised"} color={"primary"} onClick={this.handleClick}>Update exchange rate</Button>
                        <br/>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Successful call</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                        <br/>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Exchange rate list</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Source Currency</TableCell>
                                            <TableCell>Target Currency</TableCell>
                                            <TableCell numeric>Quote Rate</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default App;
