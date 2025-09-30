const anexosSimplesLookup = {
  I: {
    faixa1: {
      rbt12: { min: 0, max: 180000 },
      aliquota: 4.0,
      deducao: 0,
    },
    faixa2: {
      rbt12: { min: 180000.01, max: 360000 },
      aliquota: 7.3,
      deducao: 5940,
    },
    faixa3: {
      rbt12: { min: 360000.01, max: 720000 },
      aliquota: 9.5,
      deducao: 13860,
    },
    faixa4: {
      rbt12: { min: 720000.01, max: 1800000 },
      aliquota: 10.7,
      deducao: 22500,
    },
    faixa5: {
      rbt12: { min: 1800000.01, max: 3600000 },
      aliquota: 14.3,
      deducao: 87300,
    },
    faixa6: {
      rbt12: { min: 3600000.01, max: 4800000 },
      aliquota: 19.0,
      deducao: 378000,
    },
  },
  II: {
    faixa1: {
      rbt12: { min: 0, max: 180000 },
      aliquota: 4.5,
      deducao: 0,
    },
    faixa2: {
      rbt12: { min: 180000.01, max: 360000 },
      aliquota: 7.8,
      deducao: 5940,
    },
    faixa3: {
      rbt12: { min: 360000.01, max: 720000 },
      aliquota: 10.0,
      deducao: 13860,
    },
    faixa4: {
      rbt12: { min: 720000.01, max: 1800000 },
      aliquota: 11.2,
      deducao: 22500,
    },
    faixa5: {
      rbt12: { min: 1800000.01, max: 3600000 },
      aliquota: 14.7,
      deducao: 85500,
    },
    faixa6: {
      rbt12: { min: 3600000.01, max: 4800000 },
      aliquota: 30.0,
      deducao: 720000,
    },
  },
  III: {
    faixa1: {
      rbt12: { min: 0, max: 180000 },
      aliquota: 6.0,
      deducao: 0,
    },
    faixa2: {
      rbt12: { min: 180000.01, max: 360000 },
      aliquota: 11.2,
      deducao: 9360,
    },
    faixa3: {
      rbt12: { min: 360000.01, max: 720000 },
      aliquota: 13.5,
      deducao: 17640,
    },
    faixa4: {
      rbt12: { min: 720000.01, max: 1800000 },
      aliquota: 16.0,
      deducao: 35640,
    },
    faixa5: {
      rbt12: { min: 1800000.01, max: 3600000 },
      aliquota: 21.0,
      deducao: 125640,
    },
    faixa6: {
      rbt12: { min: 3600000.01, max: 4800000 },
      aliquota: 33.0,
      deducao: 648000,
    },
  },
  IV: {
    faixa1: {
      rbt12: { min: 0, max: 180000 },
      aliquota: 4.5,
      deducao: 0,
    },
    faixa2: {
      rbt12: { min: 180000.01, max: 360000 },
      aliquota: 9.0,
      deducao: 8100,
    },
    faixa3: {
      rbt12: { min: 360000.01, max: 720000 },
      aliquota: 10.2,
      deducao: 12420,
    },
    faixa4: {
      rbt12: { min: 720000.01, max: 1800000 },
      aliquota: 14.0,
      deducao: 39780,
    },
    faixa5: {
      rbt12: { min: 1800000.01, max: 3600000 },
      aliquota: 22.0,
      deducao: 183780,
    },
    faixa6: {
      rbt12: { min: 3600000.01, max: 4800000 },
      aliquota: 33.0,
      deducao: 828000,
    },
  },
  V: {
    faixa1: {
      rbt12: { min: 0, max: 180000 },
      aliquota: 15.5,
      deducao: 0,
    },
    faixa2: {
      rbt12: { min: 180000.01, max: 360000 },
      aliquota: 18.0,
      deducao: 4500,
    },
    faixa3: {
      rbt12: { min: 360000.01, max: 720000 },
      aliquota: 19.5,
      deducao: 9900,
    },
    faixa4: {
      rbt12: { min: 720000.01, max: 1800000 },
      aliquota: 20.5,
      deducao: 17100,
    },
    faixa5: {
      rbt12: { min: 1800000.01, max: 3600000 },
      aliquota: 23.0,
      deducao: 62100,
    },
    faixa6: {
      rbt12: { min: 3600000.01, max: 4800000 },
      aliquota: 30.5,
      deducao: 540000,
    },
  },
};

export default anexosSimplesLookup;

export type AnexosSimples = keyof typeof anexosSimplesLookup;
