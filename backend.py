import os
from datetime import datetime

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI

from db import Cashback, Category, Beneficiary, Card

app = FastAPI(debug=True)

API_PATH = '/api'


@app.get(API_PATH + '/cashbacks')
async def cashbacks_this_month_endpoint():
    return await cashbacks_endpoint(datetime.now().strftime("%Y.%m"))


@app.get(API_PATH + '/cashbacks/{date}')
async def cashbacks_endpoint(date: str):
    date = datetime.strptime(date, "%Y.%m")
    cashbacks_query = (Cashback
                       .select(Cashback, Beneficiary, Category, Card)
                       .where(Cashback.date.year == date.year, Cashback.date.month == date.month)
                       .left_outer_join(Category)
                       .switch(Cashback)
                       .left_outer_join(Beneficiary)
                       .left_outer_join(Card)
                       .order_by(Beneficiary, Cashback.super))
    # .prefetch(Beneficiary, Category, Card))
    # print(cashbacks_query.sql())
    # cashbacks_query = Cashback.select().where(Cashback.date.year == date.year, Cashback.date.month == date.month)
    cashbacks_json = {}
    for cashback in cashbacks_query:
        entity = {
            "date": cashback.date,
            "category": {
                "name": cashback.category_id.name,
                "icon": cashback.category_id.icon,  # if '.' in cashback.category_id.icon else cashback.category_id.icon + '_zvet.png',
                "description": cashback.category_id.description,
                "mcc": cashback.category_id.mcc
            },
            # "beneficiary_full_name": cashback.beneficiary_id.full_name if cashback.beneficiary_id_id else None,
            "percent": cashback.percent
        }
        if cashback.start_date:
            entity["start_date"] = cashback.start_date
        if cashback.end_date:
            entity["end_date"] = cashback.end_date
        if cashback.overwritten_description:
            entity["overwritten_description"] = cashback.overwritten_description
        if cashback.super:
            entity["super"] = cashback.super

        if not cashback.beneficiary_id_id:
            if (unsorted := "unsorted") not in cashbacks_json:
                cashbacks_json[unsorted] = []
            cashbacks_json[unsorted].append(entity)
        else:
            if (name := cashback.beneficiary_id.full_name) not in cashbacks_json:
                cashbacks_json[name] = []
            cashbacks_json[name].append(entity)

        # cashbacks_json.append(entity)

    return cashbacks_json


@app.get(API_PATH + '/categories')
async def categories_endpoint():
    categories = Category.select()
    return [(category.name, category.description, category.mcc) for category in categories]


if __name__ == '__main__':
    load_dotenv()
    uvicorn.run("backend:app", port=int(os.environ.get('ABC_PORT')), reload=True, env_file=".env", use_colors=True)
