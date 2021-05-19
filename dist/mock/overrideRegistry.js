export const overrideRegistry = {
    "properties": {
        "model": {
            "propertyName": {
                "xs": 12,
                "md": 6,
                "group": "PropertyInfo",
                "position": 1,
                "listShow": true,
                "label": "Property Name"
            },
            "area": {
                "xs": 12,
                "md": 6,
                "group": "Location",
                "position": 7,
                "label": "Area",
                "listShow": true
            },
            "askedPrice": {
                "type": "money"
            },
            "currentPlace": {
                "listShow": true,
                "label": "State"
            }
        },
        "table": [
            {
                "id": "propertyName",
                "label": "Property Name"
            },
            {
                "id": "address",
                "label": "Address"
            },
            {
                "id": "arthurProperty.id",
                "label": "Arthur Id"
            },
            {
                "id": "currentPlace",
                "label": "Status"
            }
        ],
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "showPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "formType": "tab-horizontal"
    },
    "areas": {
        "model": {
            "name": {
                "listShow": true
            },
            "properties": {
                "listShow": true
            }
        }
    },
    "agents": {
        "model": {
            "fullName": {
                "label": "Full Name",
                "md": 12
            }
        }
    },
    "units": {
        "model": {
            "currentPlace": {
                "label": "State"
            }
        },
        "table": [
            {
                "id": "unitLetter",
                "label": "Letter"
            },
            {
                "id": "property",
                "label": "Property"
            },
            {
                "id": "currentPlace",
                "label": "Status"
            }
        ],
        "tableActions": [
            {
                "label": "Available Units",
                "icon": {
                    "type": {
                        "type": {},
                        "compare": null
                    },
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                }
            }
        ],
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "showPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "landlords": {
        "model": {
            "personalData": {
                "resource": {
                    "model": {
                        "telephone": {
                            "type": "phone"
                        },
                        "mobile": {
                            "type": "phone"
                        }
                    }
                }
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "table": [
            {
                "id": "personalData.name",
                "label": "Name"
            },
            {
                "id": "personalData.surname",
                "label": "Surname"
            },
            {
                "id": "personalData.email",
                "label": "Email"
            }
        ]
    },
    "landlord_properties": {
        "model": {
            "property": {
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                }
            }
        }
    },
    "landlord_contracts": {
        "model": {
            "startDate": {
                "listShow": true
            },
            "endDate": {
                "listShow": true
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "bank_accounts": {
        "model": {
            "accountName": {
                "listShow": true
            },
            "bankName": {
                "listShow": true
            }
        }
    },
    "contracts": {
        "model": {
            "startDate": {
                "listShow": true
            },
            "endDate": {
                "listShow": true
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "landlord_tenancies": {
        "model": {
            "contract": {
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                }
            },
            "payments": {
                "listShow": true,
                "type": "embedded",
                "cardinality": "multiple",
                "resourceName": "landlord_tenancy_payments",
                "xs": 12,
                "md": 12,
                "label": "Payments",
                "group": "Units",
                "position": 1
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "landlord_tenancy_payments": {
        "table": [
            {
                "id": "dueDate",
                "label": "Due date"
            },
            {
                "id": "status",
                "label": "Status"
            },
            {
                "id": "type",
                "label": "Type"
            }
        ],
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "showPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "default_payment_items": {
        "model": {
            "name": {
                "listShow": true,
                "label": "Name"
            },
            "fee": {
                "listShow": true,
                "label": "Fee",
                "adornment": {
                    "type": {
                        "propTypes": {},
                        "Naked": {
                            "propTypes": {}
                        },
                        "options": {
                            "defaultTheme": {
                                "breakpoints": {
                                    "keys": [
                                        "xs",
                                        "sm",
                                        "md",
                                        "lg",
                                        "xl"
                                    ],
                                    "values": {
                                        "xs": 0,
                                        "sm": 600,
                                        "md": 960,
                                        "lg": 1280,
                                        "xl": 1920
                                    }
                                },
                                "direction": "ltr",
                                "mixins": {
                                    "toolbar": {
                                        "minHeight": 56,
                                        "@media (min-width:0px) and (orientation: landscape)": {
                                            "minHeight": 48
                                        },
                                        "@media (min-width:600px)": {
                                            "minHeight": 64
                                        }
                                    }
                                },
                                "overrides": {},
                                "palette": {
                                    "common": {
                                        "black": "#000",
                                        "white": "#fff"
                                    },
                                    "type": "light",
                                    "primary": {
                                        "light": "#7986cb",
                                        "main": "#3f51b5",
                                        "dark": "#303f9f",
                                        "contrastText": "#fff"
                                    },
                                    "secondary": {
                                        "light": "#ff4081",
                                        "main": "#f50057",
                                        "dark": "#c51162",
                                        "contrastText": "#fff"
                                    },
                                    "error": {
                                        "light": "#e57373",
                                        "main": "#f44336",
                                        "dark": "#d32f2f",
                                        "contrastText": "#fff"
                                    },
                                    "warning": {
                                        "light": "#ffb74d",
                                        "main": "#ff9800",
                                        "dark": "#f57c00",
                                        "contrastText": "rgba(0, 0, 0, 0.87)"
                                    },
                                    "info": {
                                        "light": "#64b5f6",
                                        "main": "#2196f3",
                                        "dark": "#1976d2",
                                        "contrastText": "#fff"
                                    },
                                    "success": {
                                        "light": "#81c784",
                                        "main": "#4caf50",
                                        "dark": "#388e3c",
                                        "contrastText": "rgba(0, 0, 0, 0.87)"
                                    },
                                    "grey": {
                                        "50": "#fafafa",
                                        "100": "#f5f5f5",
                                        "200": "#eeeeee",
                                        "300": "#e0e0e0",
                                        "400": "#bdbdbd",
                                        "500": "#9e9e9e",
                                        "600": "#757575",
                                        "700": "#616161",
                                        "800": "#424242",
                                        "900": "#212121",
                                        "A100": "#d5d5d5",
                                        "A200": "#aaaaaa",
                                        "A400": "#303030",
                                        "A700": "#616161"
                                    },
                                    "contrastThreshold": 3,
                                    "tonalOffset": 0.2,
                                    "text": {
                                        "primary": "rgba(0, 0, 0, 0.87)",
                                        "secondary": "rgba(0, 0, 0, 0.54)",
                                        "disabled": "rgba(0, 0, 0, 0.38)",
                                        "hint": "rgba(0, 0, 0, 0.38)"
                                    },
                                    "divider": "rgba(0, 0, 0, 0.12)",
                                    "background": {
                                        "paper": "#fff",
                                        "default": "#fafafa"
                                    },
                                    "action": {
                                        "active": "rgba(0, 0, 0, 0.54)",
                                        "hover": "rgba(0, 0, 0, 0.04)",
                                        "hoverOpacity": 0.04,
                                        "selected": "rgba(0, 0, 0, 0.08)",
                                        "selectedOpacity": 0.08,
                                        "disabled": "rgba(0, 0, 0, 0.26)",
                                        "disabledBackground": "rgba(0, 0, 0, 0.12)",
                                        "disabledOpacity": 0.38,
                                        "focus": "rgba(0, 0, 0, 0.12)",
                                        "focusOpacity": 0.12,
                                        "activatedOpacity": 0.12
                                    }
                                },
                                "props": {},
                                "shadows": [
                                    "none",
                                    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                                    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                                    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
                                    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                                    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
                                    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
                                    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
                                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                                    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
                                    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
                                    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
                                    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
                                    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
                                    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
                                    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
                                    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
                                    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
                                    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
                                    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
                                    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
                                    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
                                    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
                                    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
                                    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
                                ],
                                "typography": {
                                    "htmlFontSize": 16,
                                    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                    "fontSize": 14,
                                    "fontWeightLight": 300,
                                    "fontWeightRegular": 400,
                                    "fontWeightMedium": 500,
                                    "fontWeightBold": 700,
                                    "h1": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 300,
                                        "fontSize": "6rem",
                                        "lineHeight": 1.167,
                                        "letterSpacing": "-0.01562em"
                                    },
                                    "h2": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 300,
                                        "fontSize": "3.75rem",
                                        "lineHeight": 1.2,
                                        "letterSpacing": "-0.00833em"
                                    },
                                    "h3": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "3rem",
                                        "lineHeight": 1.167,
                                        "letterSpacing": "0em"
                                    },
                                    "h4": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "2.125rem",
                                        "lineHeight": 1.235,
                                        "letterSpacing": "0.00735em"
                                    },
                                    "h5": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "1.5rem",
                                        "lineHeight": 1.334,
                                        "letterSpacing": "0em"
                                    },
                                    "h6": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 500,
                                        "fontSize": "1.25rem",
                                        "lineHeight": 1.6,
                                        "letterSpacing": "0.0075em"
                                    },
                                    "subtitle1": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "1rem",
                                        "lineHeight": 1.75,
                                        "letterSpacing": "0.00938em"
                                    },
                                    "subtitle2": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 500,
                                        "fontSize": "0.875rem",
                                        "lineHeight": 1.57,
                                        "letterSpacing": "0.00714em"
                                    },
                                    "body1": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "1rem",
                                        "lineHeight": 1.5,
                                        "letterSpacing": "0.00938em"
                                    },
                                    "body2": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "0.875rem",
                                        "lineHeight": 1.43,
                                        "letterSpacing": "0.01071em"
                                    },
                                    "button": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 500,
                                        "fontSize": "0.875rem",
                                        "lineHeight": 1.75,
                                        "letterSpacing": "0.02857em",
                                        "textTransform": "uppercase"
                                    },
                                    "caption": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "0.75rem",
                                        "lineHeight": 1.66,
                                        "letterSpacing": "0.03333em"
                                    },
                                    "overline": {
                                        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
                                        "fontWeight": 400,
                                        "fontSize": "0.75rem",
                                        "lineHeight": 2.66,
                                        "letterSpacing": "0.08333em",
                                        "textTransform": "uppercase"
                                    }
                                },
                                "shape": {
                                    "borderRadius": 4
                                },
                                "transitions": {
                                    "easing": {
                                        "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
                                        "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
                                        "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
                                        "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
                                    },
                                    "duration": {
                                        "shortest": 150,
                                        "shorter": 200,
                                        "short": 250,
                                        "standard": 300,
                                        "complex": 375,
                                        "enteringScreen": 225,
                                        "leavingScreen": 195
                                    }
                                },
                                "zIndex": {
                                    "mobileStepper": 1000,
                                    "speedDial": 1050,
                                    "appBar": 1100,
                                    "drawer": 1200,
                                    "modal": 1300,
                                    "snackbar": 1400,
                                    "tooltip": 1500
                                }
                            },
                            "name": "MuiInputAdornment"
                        }
                    },
                    "key": null,
                    "ref": null,
                    "props": {
                        "position": "start",
                        "children": "£"
                    },
                    "_owner": null,
                    "_store": {}
                }
            }
        }
    },
    "negotiations": {
        "model": {
            "negotiationOffers": {
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                },
                "modifyOnlyLastElement": true
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "landlord_relationships": {
        "model": {
            "property": {
                "id": "property",
                "label": "Enquired Property",
                "type": "embedded_single",
                "resourceName": "properties",
                "cardinality": 1,
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                },
                "resource": {
                    "model": {
                        "propertyName": {
                            "xs": 12,
                            "md": 6,
                            "group": "PropertyInfo",
                            "position": 1,
                            "listShow": true,
                            "label": "Property Name"
                        },
                        "area": {
                            "xs": 12,
                            "md": 6,
                            "group": "Location",
                            "position": 7,
                            "label": "Area",
                            "listShow": true
                        },
                        "askedPrice": {
                            "type": "money"
                        },
                        "currentPlace": {
                            "listShow": true,
                            "label": "State"
                        }
                    },
                    "table": [
                        {
                            "id": "propertyName",
                            "label": "Property Name"
                        },
                        {
                            "id": "address",
                            "label": "Address"
                        },
                        {
                            "id": "arthurProperty.id",
                            "label": "Arthur Id"
                        },
                        {
                            "id": "currentPlace",
                            "label": "Status"
                        }
                    ],
                    "editPage": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null,
                        "_store": {}
                    },
                    "createPage": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null,
                        "_store": {}
                    },
                    "showPage": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null,
                        "_store": {}
                    },
                    "formType": "tab-horizontal"
                }
            },
            "landlord": {
                "id": "landlord",
                "label": "Landlord",
                "type": "embedded_single",
                "resourceName": "landlords",
                "cardinality": 1,
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                },
                "resource": {
                    "model": {
                        "personalData": {
                            "resource": {
                                "model": {
                                    "telephone": {
                                        "type": "phone"
                                    },
                                    "mobile": {
                                        "type": "phone"
                                    }
                                }
                            }
                        }
                    },
                    "createPage": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null,
                        "_store": {}
                    },
                    "table": [
                        {
                            "id": "personalData.name",
                            "label": "Name"
                        },
                        {
                            "id": "personalData.surname",
                            "label": "Surname"
                        },
                        {
                            "id": "personalData.email",
                            "label": "Email"
                        }
                    ]
                }
            },
            "firstLandlordTenancy": {
                "listShow": true,
                "optionText": "label",
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                }
            }
        },
        "table": [
            {
                "id": "property.propertyName",
                "label": "Property"
            },
            {
                "id": "landlord.personalData.name",
                "label": "Landlord name"
            },
            {
                "id": "currentPlace",
                "label": "Status"
            }
        ],
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "showPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "first_landlord_tenancies": {
        "model": {
            "holdingDepositContract": {
                "form": {
                    "key": null,
                    "ref": null,
                    "props": {},
                    "_owner": null,
                    "_store": {}
                }
            }
        },
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    },
    "portals": {
        "table": [
            {
                "id": "name",
                "label": "Portal Name"
            }
        ]
    },
    "users": {
        "table": [
            {
                "id": "email",
                "label": "Email"
            },
            {
                "id": "roles",
                "label": "Roles"
            }
        ]
    },
    "invoices": {
        "table": [
            {
                "id": "reference",
                "label": "Reference Nr."
            },
            {
                "id": "dueTime",
                "label": "Due date"
            },
            {
                "id": "status",
                "label": "Status"
            },
            {
                "id": "type",
                "label": "Type"
            }
        ]
    },
    "renewal_landlord_tenancies": {
        "createPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        },
        "editPage": {
            "key": null,
            "ref": null,
            "props": {},
            "_owner": null,
            "_store": {}
        }
    }
};