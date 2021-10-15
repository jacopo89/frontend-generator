

export const modelwop = {
    "courses":{
        "operations":[
            {
                "name":"get",
                "method":"GET",
                "model":[
                    {"title":{
                        "id":"title",
                            "type":"string",
                            "label":"title",
                            "resourceName":null,
                            "resource":null,
                            "validators":["required"],
                            "errorMessages":["Thisfield isrequired"]
                    }
                    },
                    {"society":{
                        "id":"society",
                            "type":"reference",
                            "label":"society",
                            "resourceName":"societies",
                            "resource":{
                            "title":"societies",
                                "model":[
                                    {"name":{
                                        "id":"name",
                                            "type":"string",
                                            "label":"name",
                                            "resourceName":null,
                                            "resource":null,
                                            "validators":["required"],
                                            "errorMessages":["Thisfield is required"]
                                    }
                                    }
                                    ],
                                "resourceName":"societies"
                            },
                            "validators":["required"],
                            "errorMessages":["This field isrequired"]
                    }
                    }
                    ]
            },
            {"name":"get_some","method":"GET","model":[{"title":{"id":"title","type":"string","label":"title","resourceName":null,"resource":null,"validators":["required"],"errorMessages":["Thisfield isrequired"]}}]}],"resourceName":"courses","title":"Courses"},"societies":{"operations":[],"resourceName":"societies","title":"societies"}}
