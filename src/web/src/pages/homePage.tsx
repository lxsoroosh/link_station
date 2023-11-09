import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import config from "../config";
import axios from "axios";
import {StationItem, StationResponse} from "../models";

const HomePage = () => {
    const [findFormState, setFindFormState] = useState<StationItem>({x: '', y: '', reach: '', id:0});
    const [createFormState, setCreateFormState] = useState<StationItem>({x: '', y: '', reach: '', id:0});
    const [result, setResult] = useState<string>('');
    const [stations, setStations] = useState<StationItem[]>([]);

    const Axios = axios.create({
        baseURL: config.api.baseUrl || 'http://127.0.0.1:8000'
    });

    const fetchStations = async () => {
        try {
            // Adjust the query parameter based on the backend change
            const response = await Axios.get<StationItem[]>('find_best_station', {
                params: {fetch_stations: true}
            });

            setStations(response.data);
        } catch (error) {
            console.error('There was an error fetching the link stations:', error);
        }
    };

    useEffect(() => {
        fetchStations();
    }, []);

    const handleDeleteStation = async (stationId: number) => {
        try {
            await Axios.delete(`find_best_station?id=${stationId}`);
            setStations(stations.filter((station) => station.id !== stationId));
        } catch (error) {
            console.error('There was an error deleting the link station:', error);
        }
    };

    const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFindFormState({...findFormState, [e.target.name]: e.target.value});
    };

    const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateFormState({...createFormState, [e.target.name]: e.target.value});
    };

    const handleFindSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await Axios.get<StationResponse>('find_best_station', {
                params: {x: findFormState.x, y: findFormState.y},
            });

            if (response.data.station) {
                setResult(`Best link station for point (${findFormState.x},${findFormState.y}) is (${response.data.station.x},${response.data.station.y}) with power ${response.data.power}`);
            } else {
                setResult(response.data.message || 'Error finding the best link station.');
            }
        } catch (error) {
            console.error('There was an error fetching the link station data:', error);
            setResult('Error fetching data. Please try again.');
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await Axios.post('find_best_station', {
                x: createFormState.x,
                y: createFormState.y,
                reach: createFormState.reach,
            });
            await fetchStations()
            setResult(`Link station created at (${response.data.x}, ${response.data.y}) with reach ${response.data.reach}`);
        } catch (error) {
            console.error('There was an error creating the link station:', error);
            setResult('Error creating link station. Please try again.');
        }
    };

    return (
        <Container maxWidth="md" sx={{py: 4}}>
            <Grid container spacing={3} sx={{height: '100vh', alignItems: 'stretch'}}>
                <Grid item xs={12} md={8}>

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Find the Best Link Station
                            </Typography>
                            <Box component="form" onSubmit={handleFindSubmit} noValidate autoComplete="off">
                                <Stack direction="column" spacing={2} mb={2}>
                                    <TextField
                                        label="Enter X coordinate"
                                        variant="outlined"
                                        name="x"
                                        value={findFormState.x}
                                        onChange={handleFindChange}
                                        fullWidth
                                        sx={{ backgroundColor: 'white', color: '#fff' }} // setting the background and text color
                                    />
                                    <TextField
                                        label="Enter Y coordinate"
                                        variant="outlined"
                                        name="y"
                                        value={findFormState.y}
                                        onChange={handleFindChange}
                                        fullWidth
                                        sx={{ backgroundColor: 'white', color: '#fff' }} // setting the background and text color
                                    />
                                    <Button variant="contained" color="primary" type="submit">
                                        Find Station
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Create a New Link Station
                            </Typography>
                            <Box component="form" onSubmit={handleCreateSubmit} noValidate autoComplete="off">
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        label="Enter X coordinate"
                                        variant="outlined"
                                        name="x"
                                        value={createFormState.x}
                                        onChange={handleCreateChange}
                                        fullWidth
                                        sx={{ backgroundColor: 'white', color: '#fff' }} // setting the background and text color
                                    />
                                    <TextField
                                        label="Enter Y coordinate"
                                        variant="outlined"
                                        name="y"
                                        value={createFormState.y}
                                        onChange={handleCreateChange}
                                        fullWidth
                                        sx={{ backgroundColor: 'white', color: '#fff' }} // setting the background and text color
                                    />
                                    <TextField
                                        label="Enter Reach"
                                        variant="outlined"
                                        name="reach"
                                        value={createFormState.reach}
                                        onChange={handleCreateChange}
                                        sx={{ backgroundColor: 'white', text: 'white' }} // setting the background and text color
                                    />
                                    <Button variant="contained" color="secondary" type="submit">
                                        Create Station
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>


                    </Stack>
                </Grid>
                <Grid item xs={12} md={4} sx={{
                    width: '100%',
                    maxWidth: '100%'
                }}>
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Existing Link Stations
                        </Typography>
                        <List>
                            {stations && stations.length > 0 && stations.map((station) => (
                                <ListItem
                                    key={station.id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleDeleteStation(station.id)}>
                                            <IconButton
                                                sx={{ color: 'white' }}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>

                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={`ID: ${station.id}`}
                                        secondary={`Coordinates: (${station.x}, ${station.y}), Reach: ${station.reach}`}
                                        sx={{ color: 'white', '.MuiListItemText-secondary': { color: 'white' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    {result && (
                        <Box sx={{width: '100%'}}> {/* Adjusted for full width */}
                            <Typography variant="body1">{result}</Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
};

export default HomePage;