import { TYPES_ASSETS } from "./TypesAssets"
export const MANAGEMENT_ELEMENTS =[
    {
        title: '¿Tiene la necesidad de gestionar y controlar sus activos?',
        content: 'el-radio-group',
        model:'radio',
        id:1,
        children: [
            {
                id:1,
                content:'el-radio',
                size:'large',
                props:{
                    label: 'Si',
                    value:true
                }
            },
            {
                id:2,
                content:'el-radio',
                size:'large',
                props:{
                    label: 'No',
                    value:false
                }
            }
        ]
    },
    {
        title: '¿Qué tipo de Activo desea controlar?',
        content: 'el-select',
        model:'type',
        id:2,
        props:{
            clearable: true,
            placeholder:"Seleccione el tipo de activo",
            size:"large" 
        },
        children: [
            {
                id:TYPES_ASSETS[0].id, 
                content:'el-option',
                size:'large',
                props:{
                    label: TYPES_ASSETS[0].name, 
                    value:TYPES_ASSETS[0].value,
                }
            },
            {
                id:TYPES_ASSETS[1].id, 
                content:'el-option',
                size:'large',
                props:{
                    label: TYPES_ASSETS[1].name, 
                    value:TYPES_ASSETS[1].value,
                }
            },
            {
                id:TYPES_ASSETS[2].id,
                content:'el-option',
                size:'large',
                props:{
                    label: TYPES_ASSETS[2].name, 
                    value:TYPES_ASSETS[2].value,
                }
            }
        ]
    }
]