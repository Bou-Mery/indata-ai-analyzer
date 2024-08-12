import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def visualize_data(df):
    st.title("Data Visualization")
    
    st.write("### Data Preview")
    st.write(df)

    plot_type = st.selectbox("Select plot type:", [
        "Bar Plot", 
        "Scatter Plot", 
        "Line Plot", 
        "Histogram", 
        "Box Plot"
    ])
    x_axis = st.selectbox("Select X axis:", df.columns)
    y_axis = st.selectbox("Select Y axis:", df.columns)

    plt.figure(figsize=(10, 6))

    if plot_type == "Bar Plot":
        sns.barplot(x=x_axis, y=y_axis, data=df, palette="muted")
    elif plot_type == "Scatter Plot":
        sns.scatterplot(x=x_axis, y=y_axis, data=df)
    elif plot_type == "Line Plot":
        sns.lineplot(x=x_axis, y=y_axis, data=df)
    elif plot_type == "Histogram":
        if y_axis == "":  # Histograms usually require only one axis
            st.write("Please select a Y axis for the histogram.")
        else:
            df[x_axis].hist(bins=30, color='skyblue')
            plt.xlabel(x_axis)
            plt.ylabel('Frequency')
    
    elif plot_type == "Box Plot":
        sns.boxplot(x=x_axis, y=y_axis, data=df)

    plt.xlabel(x_axis)
    plt.ylabel(y_axis)
    st.pyplot(plt)

def main():
    st.title("File Upload for Visualization")
    # Check if the CSV file exists and load it
    try:
        df = pd.read_csv('uploaded_data.csv')
        visualize_data(df)
    except FileNotFoundError:
        st.write("No data file uploaded yet.")

if __name__ == "__main__":
    main()



