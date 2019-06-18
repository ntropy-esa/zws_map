#!/bin/bash
cp assets/img/logo-carte.png ./dist/
cp cache_bulk_data.json ./dist/
yes | cp -rf cache_bulk_data.json ./dist/
