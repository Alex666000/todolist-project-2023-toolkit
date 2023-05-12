import {Button} from "@mui/material";
import React, {FC, ReactNode} from "react";
import {FilterValuesType} from "features/todolists-list/todolists/todolists.reducer";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";


export type FilterButtonPropsType = {
    onClick: () => void
    selectedFilter: FilterValuesType
    buttonFilter: FilterValuesType
    color: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
        ButtonPropsColorOverrides>
    children: ReactNode
}
export const FilterButton: FC<FilterButtonPropsType> = ({onClick, selectedFilter, buttonFilter, children, color}) => {

    return (
        <Button
            variant={selectedFilter === buttonFilter ? "outlined" : "text"}
            onClick={onClick}
            color={color}
        >
            {children}
        </Button>
    )
}