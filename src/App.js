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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, currencies: {}, rates: {},  source:0.1, target:0.0, amount:0.0, targetAmount:0.0};
        this.initPage();
    }

    initPage(){
        let self = this;
        let currencies = {};
        let rates = {};
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
                    let ss = key.substr(3,6);
                    rates[ss]=list[key];
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
        let rates = {};
        let callback = {
            onSuccess: function (response) {
                console.log(response.data);
                let listCurrencies = response.data.currencies;
                console.log(listCurrencies);
                for (var key in listCurrencies) {
                    currencies[key]=listCurrencies[key];
                }
                let listRates = response.data.rates;
                console.log(listRates);
                for (var key in listRates) {
                    let ss = key.substr(3,6);
                    rates[ss]=listRates[key];
                }
                console.log(currencies);
                console.log(rates);
                self.setState({currencies: currencies, rates:rates, message:"Http 200: Update realized"});

            },
            onfailed: function (error) {
                self.setState({message:"Http 202: Is not possible update yet"});
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

    handleAmountChange (e){
        this.setState({
            amount : (e.target.value==="")?0.0:parseFloat(e.target.value)
        });
        this.state = {open: this.state.open, currencies: this.state.currencies, rates: this.state.rates,
            source:this.state.source, target:this.state.target, amount:(e.target.value==="")?0.0:parseFloat(e.target.value), targetAmount:this.state.targetAmount};
        this.updateTargetAmount();

    };
    handleSourceCurrencyChange (e){
        this.setState({
            source : e.target.value
        });
        this.state = {open: this.state.open, currencies: this.state.currencies, rates: this.state.rates,
            source:e.target.value, target:this.state.target, amount:this.state.amount, targetAmount:this.state.targetAmount};
        this.updateTargetAmount();

    };
    handleTargetCurrencyChange (e){

        this.setState({
            target : e.target.value
        });
        this.state = {open: this.state.open, currencies: this.state.currencies, rates: this.state.rates,
            source:this.state.source, target:e.target.value, amount:this.state.amount, targetAmount:this.state.targetAmount};
        this.updateTargetAmount();
    };
    updateTargetAmount(){
        let temp = this.state.amount / this.state.source * this.state.target;
        this.setState({
            targetAmount : temp
        });
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
                            <Input type="numeric" id="sourceAmount" value={this.state.amount} onChange={evt => this.handleAmountChange(evt)}/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="sourceCurrency">Source Currency</InputLabel>
                            <Select
                                style={{width: '150px',height:'30px'}}
                                value={this.state.source}
                                onChange={evt => this.handleSourceCurrencyChange(evt)}
                                inputProps={{
                                    name: 'source',
                                    id: 'sourceCurrency',
                                }}
                            >
                                {Object.keys(this.state.currencies).sort().map(row =>{
                                    return(
                                        <MenuItem value={this.state.rates[row]}>
                                            <em>{row}</em>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="targetCurrency">Target Currency</InputLabel>
                            <Select
                                style={{width: '150px',height:'30px'}}
                                value={this.state.target}
                                onChange={evt => this.handleTargetCurrencyChange(evt)}
                                inputProps={{
                                    name: 'target',
                                    id: 'targetCurrency',
                                }}
                            >
                                {Object.keys(this.state.currencies).sort().map(row =>{
                                    return(
                                        <MenuItem value={this.state.rates[row]}>
                                            <em>{row}</em>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl margin="normal">
                            <InputLabel>Target Amount</InputLabel>
                            <Input type="numeric" id="targetAmount" disabled value={this.state.targetAmount}/>
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
                                        {Object.keys(this.state.rates).map(row=>{
                                          return(
                                              <TableRow key={row}>
                                                  <TableCell component="th" scope="row">
                                                      {"USD"}
                                                  </TableCell>
                                                  <TableCell>
                                                      {row + " ("+this.state.currencies[row]+")"}
                                                  </TableCell>
                                                  <TableCell numeric>
                                                      {this.state.rates[row]}
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
