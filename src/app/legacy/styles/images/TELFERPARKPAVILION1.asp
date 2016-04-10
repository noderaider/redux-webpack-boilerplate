<!--#INCLUDE virtual="PrivateLabelInclude.asp" -->
<!--#include virtual="GlobalInclude.asp" -->
<!--#include virtual="dbOpenInclude.asp"-->
<%
Page = "Seating"
ProgramName = "Section"
%>
<html>
<title><%= Title %></title>
<%= strBody %>
<center>

<!--#INCLUDE VIRTUAL="TopNavInclude.asp"-->

<br>

<%
SQLQuery = "SELECT Act, Venue From Event (NOLOCK) INNER JOIN Venue (NOLOCK) ON Event.VenueCode = Venue.VenueCode INNER JOIN Act (NOLOCK) ON Event.ActCode = Act.ActCode WHERE EventCode = " & CleanNumeric(Request("Event"))
Set rsEvents = OBJdbConnection.Execute(SQLQuery)
%>      

<!--#INCLUDE VIRTUAL="EventDetailShortInclude.asp"-->

<FONT FACE="<%= FontFace %>" COLOR="<%= FontColor %>" SIZE="2"><B>Click on a section below to see availability.</B></FONT><BR>
<BR>

<!--#INCLUDE VIRTUAL="GenericMapInclude.asp"-->

<BR>
<BR>

<!--#INCLUDE VIRTUAL="PriceInclude.asp"-->

<!--#INCLUDE VIRTUAL="FooterInclude.asp"-->

</BODY>
</HTML>
