define({ "api": [
  {
    "type": "post",
    "url": "/movie/lst",
    "title": "电影列表接口",
    "name": "movie",
    "group": "电影管理",
    "version": "1.1.0",
    "description": "<p>获取电影列表信息</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "page",
            "description": "<p>页码 非必须，默认是 1</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "size",
            "description": "<p>每页显示的数量 非必须，默认是 5</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "kw",
            "description": "<p>搜索关键字 非必须</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "success-200": [
          {
            "group": "success-200",
            "type": "String",
            "optional": false,
            "field": "error_code",
            "description": "<p>响应状态码</p>"
          },
          {
            "group": "success-200",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>响应描述</p>"
          },
          {
            "group": "success-200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>返回数据，成功的时候才存在</p>"
          },
          {
            "group": "success-200",
            "type": "int",
            "optional": false,
            "field": "result.total",
            "description": "<p>记录总数</p>"
          },
          {
            "group": "success-200",
            "type": "Object[]",
            "optional": false,
            "field": "result.page",
            "description": "<p>记录列表</p>"
          },
          {
            "group": "success-200",
            "type": "Object[]",
            "optional": false,
            "field": "result.size",
            "description": "<p>记录列表</p>"
          },
          {
            "group": "success-200",
            "type": "Object[]",
            "optional": false,
            "field": "result.data",
            "description": "<p>记录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功注册-示例:",
          "content": "成功注册\nHTTP/1.1 200 OK\n{\n\t{\n        \"error_code\": 0,\n        \"reason\": \"success\",\n        \"result\": {\n        \"total\": 10,\n        \"page\": 2,\n        \"size\": 5,\n        \"data\": [\n        {\n        \"_id\": \"620dabe5bcae613f41ce9e40\",\n        \"name\": \"asdfad\",\n        \"director\": \"asdf\",\n        \"actors\": \"asdfa\",\n        \"cateName\": \"科幻\",\n        \"cateId\": \"620cc71fa42fbed078d42d8a\",\n        \"cover\": \"\",\n        \"url\": \"\",\n        \"infos\": \"sadfds\",\n        \"createdAt\": \"2022-02-17T01:59:01.298Z\",\n        \"updatedAt\": \"2022-02-17T01:59:01.298Z\",\n        \"__v\": 0\n        },\n        {\n        \"_id\": \"620db41c7dfd47f5d4ad1e83\",\n        \"name\": \"asdfdas\",\n        \"director\": \"adsfa\",\n        \"actors\": \"adsfa\",\n        \"cateName\": \"科幻\",\n        \"cateId\": \"620cc71fa42fbed078d42d8a\",\n        \"url\": \"cover-1645065244399-8479017.png\",\n        \"infos\": \"sdfa\",\n        \"createdAt\": \"2022-02-17T02:34:04.449Z\",\n        \"updatedAt\": \"2022-02-17T02:34:04.449Z\",\n        \"__v\": 0\n        },\n        {\n        \"_id\": \"620db445d65a39bfb936c2b6\",\n        \"name\": \"sadf\",\n        \"director\": \"asdf\",\n        \"actors\": \"adsfa\",\n        \"cateName\": \"动作\",\n        \"cateId\": \"620cc71fa42fbed078d42d8a\",\n        \"cover\": \"cover-1645065285248-869562930.png\",\n        \"infos\": \"adsfsa\",\n        \"createdAt\": \"2022-02-17T02:34:45.311Z\",\n        \"updatedAt\": \"2022-02-17T02:34:45.311Z\",\n        \"__v\": 0\n        },\n        {\n        \"_id\": \"620db629e189036872f7f54e\",\n        \"name\": \"dadasfadfa\",\n        \"director\": \"gfagdsgfsdgsd\",\n        \"actors\": \"gsdgsadgsdgsd\",\n        \"cateName\": \"科幻\",\n        \"cateId\": \"620cc71fa42fbed078d42d8a\",\n        \"cover\": \"cover-1645065769579-344350433.jpg\",\n        \"infos\": \"dsadsadasdsad\",\n        \"createdAt\": \"2022-02-17T02:42:49.603Z\",\n        \"updatedAt\": \"2022-02-17T02:42:49.603Z\",\n        \"__v\": 0\n        }\n        ]\n        }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "failure-500": [
          {
            "group": "failure-500",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>响应状态码</p>"
          },
          {
            "group": "failure-500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败-示例:",
          "content": "这是出现错误时返回结果示例\nHTTP/1.1 404 Not Found\n{\n code:1,\n msg:'not found',\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/movieController.js",
    "groupTitle": "电影管理",
    "sampleRequest": [
      {
        "url": "http://localhost:3006/api/v1/movie/lst"
      }
    ]
  }
] });
