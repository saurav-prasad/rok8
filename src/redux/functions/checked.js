import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = []

export const checkedSlice = createSlice({
    name: 'checkedCategory',
    initialState,
    reducers: {
        checkedItems: (state, action) => {
            let items = action.payload
            items = items.map((data) => { return { ...data, key: nanoid() } })
            state.push(...items)
        },
        addCheckedItem: (state, action) => {
            const item = {
                ...action.payload,
                key: nanoid()
            }
            state.push(item)
        },
        unCheckItem: (state, action) => {
            const items = state.filter((data) => data.id !== action.payload.id);
            return items
        }
    }
})

export const { checkedItems, addCheckedItem, unCheckItem } = checkedSlice.actions
export default checkedSlice.reducer