Se.Response = function()
{
    var _rawResponse = {};

    var _responseData = {};

    var _responseStatus = '';

    this.setResponseData = function(responseData)
    {
        _responseData = responseData;
        return this;
    }

    this.setResponseStatus = function(status)
    {
        _responseStatus = status;
        return this;
    }

    this.setRawResponse = function(rawResponse)
    {
        _rawResponse = rawResponse;
        this.setResponseData(rawResponse.data);
        this.setResponseStatus(rawResponse.status);
        return this;
    }

    this.data = function()
    {
        return _responseData;
    }

    this.status = function()
    {
        return _responseStatus;
    }

    this.isOk = function()
    {
        return this.status() == 'ok';
    }

    this.isFailed = function()
    {
        return this.status() == 'fail';
    }
}