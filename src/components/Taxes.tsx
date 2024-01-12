import React, { useMemo } from "react";
import { AppBar, Button, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import * as FormTypes from "../types/formTypes";
import { TextFieldElement } from 'react-hook-form-mui'
import { Delete } from "@mui/icons-material";
import * as Calculations from "../helpers/calculations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const TAX_RATE_FREELANCE = 0.2; // Example tax rate for freelancers

export const Taxes: React.FC = () => {

    const validationSchema: yup.ObjectSchema<FormTypes.Taxes> = yup.object({
        rows: yup.array().of(yup.object().shape({
            monthlySalary: yup.number().when('incomeType', {
                is: 'monthly',
                then: yup.number().required().min(0),
                otherwise: yup.number(),
            }),
            hourlyRate: yup.number().when('incomeType', {
                is: 'freelance',
                then: yup.number().required().min(0),
                otherwise: yup.number(),
            }),
            hoursPerDay: yup.number().when('incomeType', {
                is: 'freelance',
                then: yup.number().required().min(1).max(24),
            }),
            daysPerYear: yup.number().when('incomeType', {
                is: 'freelance',
                then: yup.number().required().min(1).max(365),
            }),
            year: yup.number().required().min(1900).max(2100).integer(),
            incomeType: yup.string().oneOf(['monthly', 'freelance']).required(),
        })).defined(),
    });

    const { control, handleSubmit } = useForm<FormTypes.Taxes>({
        defaultValues: {
            rows: [],
        },
        resolver: yupResolver(validationSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "rows",
    });

    const onClickAppendRow = (incomeType: 'monthly' | 'freelance') => {
        const defaultValues = {
            monthlySalary: incomeType === 'monthly' ? 0 : undefined,
            hourlyRate: incomeType === 'freelance' ? 0 : undefined,
            hoursPerDay: incomeType === 'freelance' ? 8 : undefined,
            daysPerYear: incomeType === 'freelance' ? 220 : undefined,
            year: 2020,
            incomeType,
        };
        append(defaultValues);
    };

    
    const rows = useWatch({
        control,
        name: "rows",
    });

    const total = useMemo(() => Calculations.getPermanentTaxesAnnualizedTotal(rows), [rows]);
    const totalAfterTaxes = useMemo(() => Calculations.getPermanentTaxesAnnualizedTotalAfterTaxes(rows), [rows]);
  

    return (
        <Stack>
            <AppBar>
                <Toolbar>
                    Calcul des taxes
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Stack component="form" onSubmit={handleSubmit(() => {
                console.log("success");
            }, () => {
                console.log("error");
            })}
                marginTop={2}
                marginX={2}
                border={1}
                borderColor="lightgray"
                borderRadius={2}
                padding={2}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Salaire par mois</TableCell>
                                <TableCell>Taux horaire</TableCell>
                                <TableCell>Nombre d'heures par jour</TableCell>
                                <TableCell>Nombre de jours par an</TableCell>
                                <TableCell>Année</TableCell>
                                {/*<TableCell>Type de revenu </TableCell>*/}
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{
                            fields.map((field, index) =>
                                <TableRow key={field.id}>
                                    <TableCell>
                                        {field.incomeType === 'monthly' && (
                                            <TextFieldElement
                                                control={control}
                                                name={`rows.${index}.monthlySalary`}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">€/ mois</InputAdornment>
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {field.incomeType === 'freelance' && (
                                            <TextFieldElement
                                                control={control}
                                                name={`rows.${index}.hourlyRate`}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">€/ heure</InputAdornment>
                                                }}
                                            />
                                        )}
                                    </TableCell>
                        
                                    <TableCell>
                                        {field.incomeType === 'freelance' && (
                                            <TextFieldElement
                                                control={control}
                                                name={`rows.${index}.hoursPerDay`}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">heures/jour</InputAdornment>
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {field.incomeType === 'freelance' && (
                                            <TextFieldElement
                                                control={control}
                                                name={`rows.${index}.daysPerYear`}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">jours/an</InputAdornment>
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextFieldElement
                                            control={control}
                                            name={`rows.${index}.year`}
                                        />
                                    </TableCell>
                                 {/*  <TableCell>
                                        <TextFieldElement
                                            control={control}
                                            name={`rows.${index}.incomeType`}
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                        >
                                            <option value="monthly">Salaire mensuel</option>
                                            <option value="freelance">Freelance</option>
                                        </TextFieldElement>
                                        </TableCell>*/}
                                    <TableCell>
                                        <IconButton onClick={() => remove(index)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" justifyContent="center" spacing={2} marginY={2}>
                    <Button onClick={() => onClickAppendRow('monthly')} sx={{ alignSelf: "center", marginTop: 2 }}>Ajouter un revenu de CDI</Button>
                    <Button onClick={() => onClickAppendRow('freelance')} sx={{ alignSelf: "center", marginTop: 2 }}>Ajouter un revenu de Freelance</Button>
                </Stack>
                <Typography variant="h6">Total : {total} €</Typography>
                <Typography variant="h6">Total après taxes : {totalAfterTaxes} €</Typography>
            </Stack>
        </Stack >
    );
}
