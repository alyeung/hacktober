package com.slf.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.slf.components.SecretHandler;
import com.slf.exceptions.BadRequestException;
import com.slf.exceptions.InternalServerErrorException;
import com.slf.model.Request;
import com.slf.model.Response;
import com.slf.util.EnvironmentConfig;

import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.quotes.stock.StockQuote;

/**
 * This is a java template for developing and deploying Lambda functions. The
 * template is based on the predefined interfaces provided by the AWS Lambda
 * Java core library to create your Lambda function handler. The advantage is
 * the library will take care of serializing and deserializing the input/output
 * automatically.
 * 
 * @Author:
 * @version: 1.0
 * @Date:
 * 
 **/

public class Handler implements RequestHandler<Request, Response> {

    static final Logger logger = Logger.getLogger(RequestHandler.class);

    //@Override
    @SuppressWarnings("static-access")
	public Response handleRequest(Request input, Context context) {
 
    	HashMap<String, String> output = new HashMap<String, String>();
    	Document doc = null;
		HashMap<String, String> data = new HashMap<String, String>();
		//ArrayList<String> downServers = new ArrayList<String>();
		String ticker="";		
	
	   if(input.getMethod().equalsIgnoreCase("GET"))
	    {
	    	data.put("message", "GET executed successfully");
	    	
			try {
				doc = Jsoup.connect("https://finance.yahoo.com/trending-tickers/").get();
			} catch (IOException e) {				
				e.printStackTrace();
			} 
	        Element table = doc.select("table").get(1);   
	            for (Element row : table.select("tr")) {
	                Elements tds = row.select("td");
	                if (tds.size() > 6) {
	                    System.out.println(tds.get(0).text());
	                    ticker += tds.get(0).text()+",";
	                }
	            }
	            output.put("ticker", ticker);
	    	}
			    
		    if(input.getMethod().equalsIgnoreCase("POST")) 
			{
		    	String sticker = null ;
		    	String Name;
		    	String Symbol;
		    	String price;
		    	String Date;
		    	
		    	data.put("message", "POST executed successfully");
		    	
		    	for (Map.Entry<String, String> entry : input.getBody().entrySet())
		    	{
		    		sticker = entry.getValue().toString();
		    	}
		    	
		    	YahooFinance yahoo = new YahooFinance();
		        Stock stock = null;
				try {
					stock = yahoo.get(sticker);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        StockQuote sq = stock.getQuote();
		        output.put("Name", stock.getName());
		        output.put("Symbol", sq.getSymbol());
		        output.put("Price", sq.getPrice().toString());
		        output.put("Date", sq.getLastTradeTime().getTime().toString());
		        
			}
   
			return new Response(data, output);
    }
}

