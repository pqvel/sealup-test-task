export interface Param {
  id: number
  name: string
  type: string
}

export interface ParamValue {
  paramId: number
  value: string
}

export interface Model {
  paramValues: ParamValue[]
  // color: Color[]
}

export interface Props {
  params: Param[]
  model: Model
}

const example: Props = {
  params: [
    {
      id: 1,
      name: 'Назначение',
      type: 'string',
    },
    {
      id: 2,
      name: 'Длина',
      type: 'string',
    },
  ],
  model: {
    paramValues: [
      {
        paramId: 1,
        value: 'повседневное',
      },
      {
        paramId: 2,
        value: 'максимальное',
      },
    ],
  },
}
