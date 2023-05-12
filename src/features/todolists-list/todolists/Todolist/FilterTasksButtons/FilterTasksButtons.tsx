import React, {FC} from "react"
import {Button} from "@mui/material"
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions,
} from "features/todolists-list/todolists/todolists.reducer"
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: todolist.id})
    }

    return (
        <div>
            <FilterButton color={'inherit'} onClick={() => changeFilterHandler('all')} selectedFilter={todolist.filter} buttonFilter={"all"}>
                All
            </FilterButton>
            <FilterButton color={'primary'} onClick={() => changeFilterHandler('active')} selectedFilter={todolist.filter} buttonFilter={"active"}>
                Active
            </FilterButton>
            <FilterButton color={'secondary'} onClick={() => changeFilterHandler('completed')} selectedFilter={todolist.filter} buttonFilter={"completed"}>
                Completed
            </FilterButton>
        </div>
    )
}

type FilterButtonPropsType = {
    onClick: () => void
    selectedFilter: FilterValuesType
    buttonFilter: FilterValuesType
    color: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
    children: any
}


// const renderFilterButton: FC<FilterButtonPropsType> = ({onClick, buttonFilter, selectedFilter, color, children}) => {
//     return (
//
//     )
// }


const FilterButton: FC<FilterButtonPropsType> = ({onClick, buttonFilter, selectedFilter, color, children}) => {

    return (
        <Button
            variant={selectedFilter === buttonFilter ? "outlined" : 'text'}
            onClick={onClick}
            color={color}
        >
            {children}
        </Button>
    );
};


