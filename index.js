const redux = require("redux");
const createStore = redux.createStore;

//Action

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function restockCake(qty = 1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}

function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 1,
	};
}

//Reducer
//(prevState, action) => newState;
const initialState = {
	numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			};
		default:
			return state;
	}
};

const store = createStore(reducer);

console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()));

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));

unsubscribe();