const initialState = {
    events: [],
    eventsStatus: STATUS.IDLE,
    eventSingle: [],
    eventSingleStatus: STATUS.IDLE
}

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncEvents.pending, (state, action) => {
            state.eventsStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncEvents.fulfilled, (state, action) => {
            state.events = action.payload;
            state.eventsStatus = STATUS.SUCCEEDED;
        })
        
        .addCase(fetchAsyncEvents.rejected, (state, action) => {
            state.eventsStatus = STATUS.FAILED
        })

        .addCase(fetchAsyncEventSingle.pending, (state, action) => {
            state.eventSingleStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncEventSingle.fulfilled, (state, action) => {
            state.eventSingle = action.payload;
            state.eventSingleStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncEventSingle.rejected, (state, action) => {
            state.eventSingleStatus = STATUS.FAILED;
        })
    }
});

export const fetchAsyncEvents = createAsyncThunk('events/fetch', async(limit) => {
    const response = await fetchDataFromApi("/api/events?populate=*");
    return response.data;
});

export default eventSlice.reducer;