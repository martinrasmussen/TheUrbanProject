<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Maps.aspx.cs" Inherits="TheUrbanProject.Maps" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="stylesheet" href="Style/Maps.css">
    <script type="text/javascript">
        var session = '<%=Session["Users"]%>';

    </script>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=true&region=US&libraries=places"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="button" id="btnCheck" class="btn btn-primary controls" type="text" value="Check In">
    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map-canvas"></div>



    <script src="Scripts/MapsScript.js"></script>
    <script src="Scripts/google-maps-3-vs-1-0.js" type="text/javascript"></script>
</asp:Content>
