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
import {gets} from './Controllers'
import './App.css';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, currencies: {}, rates: [], source:"", target:""};
        this.initPage();
    }

    initPage(){
        let self = this;
        let currencies = {};
        let rates = [];
        let callbackCurrencies = {
            onSuccess: function (response) {
                let list = response.data;
                console.log(list);
                for (var key in list) {
                    currencies[key]=list[key];
                }
                self.setState({currencies: currencies});
                console.log(self.state.currencies);
            },
            onfailed: function (error) {
                console.log(error);
            }
        };
        let callbackRates = {
            onSuccess: function (response) {
                let list = response.data;
                console.log(list);
                for (var key in list) {
                    rates.push({name:key,value:list[key]});
                }
                self.setState({rates: rates});
                console.log(self.state.rates);
            },
            onfailed: function (error) {
                console.log(error);
            }
        };
        gets.getCurrencies(callbackCurrencies);
        gets.getRates(callbackRates);
    }

    update(){
        let self = this;
        let currencies = {};
        let rates = [];
        let callback = {
            onSuccess: function (response) {
                let listCurrencies = response.data.currencies;
                console.log(listCurrencies);
                for (var key in listCurrencies) {
                    currencies[key]=listCurrencies[key];
                }
                let listRates = response.data.rates;
                console.log(listRates);
                for (var key in listRates) {
                    rates.push({name:key,value:listRates[key]});
                }
                self.setState({currencies: currencies, rates:rates, message:"Http 200: Update realized"});

            },
            onfailed: function (error) {
                self.setState({message:"Http 202: Is not possible update yet"})
                console.log(error);
            }
        };
        gets.getLatest(callback);
    }

    handleClick = () => {
        this.update();
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
                        <br/>
                        <Button variant={"raised"} color={"primary"} onClick={this.handleClick}>Update exchange rates</Button>
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
                            message={<span id="message-id">{this.state.message}</span>}
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
                                    <TableBody>
                                        {this.state.rates.map(row=>{
                                          return(
                                              <TableRow key={row.name}>
                                                  <TableCell component="th" scope="row">
                                                      {row.name.substr(0,3)}
                                                  </TableCell>
                                                  <TableCell>
                                                      {row.name.substr(3,6) + " ("+this.state.currencies[row.name.substr(3,6)]+")"}
                                                  </TableCell>
                                                  <TableCell numeric>
                                                      {row.value}
                                                  </TableCell>
                                              </TableRow>
                                          );
                                        })}
                                    </TableBody>
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
