import pandas as pd

DATA_PATH = "assets/sales_data_sample.csv"

def load_data():
    df = pd.read_csv(DATA_PATH, encoding="latin1")
    return df

def get_total_sales(df):
    return float(df["SALES"].sum())

def get_total_volume(df):
    return int(df["QUANTITYORDERED"].sum())

def get_sales_by_productline(df):
    return df.groupby("PRODUCTLINE")["SALES"].sum().to_dict()

def get_sales_by_country(df):
    return df.groupby("COUNTRY")["SALES"].sum().to_dict()
