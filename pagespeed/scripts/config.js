"use strict";

angular.module("config", [])

.constant("ENV", "production")

.constant("APP", {
  "name": "esen.io",
  "version": "1.2.0"
})

.constant("CONFIG", {
  "api_endpoint": "https://api.esen.io",
  "admin_endpoint": "https://adm.esen.io",
  "events_endpoint": "https://events.esen.io",
  "enable_html5_mode": false,
  "app_fee": "$0.75"
})

;